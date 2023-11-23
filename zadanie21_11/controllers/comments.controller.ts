import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateCommentBody, UpdateCommentBody, CommentResponse } from "../types/TComment";

const prisma = new PrismaClient();

const parseId = (id: string) => {
    if (isNaN(parseInt(id))) {
        throw new Error("Id is not a number");
    }
    return parseInt(id);
};

const createCommentResponse = (comment: any): CommentResponse => {
    return {
        id: comment.id,
        content: comment.content,
        postId: comment.postId,
    };
};

const getCommentsController = async (req: Request, res: Response<CommentResponse[] | { error: string }>) => {
    try {
        const comments = await prisma.comment.findMany();
        const commentResponse: CommentResponse[] = comments.map(createCommentResponse);
        res.json(commentResponse);
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas pobierania komentarzy." });
    }
};

const getCommentController = async (req: Request<{ id: string }>, res: Response<CommentResponse | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const comment = await prisma.comment.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (comment) {
            const commentResponse: CommentResponse = createCommentResponse(comment);
            res.json(commentResponse);
        } else {
            res.status(404).json({ error: `Comment with id ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the comment." });
    }
};

const createCommentController = async (req: Request<{}, {}, CreateCommentBody>, res: Response<CommentResponse | { error: string }>) => {
    const { content, postId } = req.body;

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                post: {
                    connect: {
                        id: postId,
                    },
                },
            },
        });

        const commentResponse: CommentResponse = createCommentResponse(comment);
        res.json(commentResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the comment." });
    }
};

const updateCommentController = async (req: Request<{ id: string }, {}, UpdateCommentBody>, res: Response<CommentResponse | { error: string }>) => {
    const { id } = req.params;
    const { content } = req.body;
    const parsedId = parseId(id);

    try {
        const existingComment = await prisma.comment.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingComment) {
            return res.status(404).json({ error: `Comment with id ${id} not found` });
        }

        const comment = await prisma.comment.update({
            where: {
                id: existingComment.id,
            },
            data: {
                content,
            },
        });

        const commentResponse: CommentResponse = createCommentResponse(comment);
        res.json(commentResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the comment." });
    }
};

const deleteCommentController = async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const existingComment = await prisma.comment.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingComment) {
            return res.status(404).json({ error: `Comment with id ${id} not found` });
        }

        await prisma.comment.delete({
            where: {
                id: existingComment.id,
            },
        });

        res.json({ message: `Comment with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the comment." });
    }
};

export { getCommentsController, getCommentController, createCommentController, updateCommentController, deleteCommentController };
