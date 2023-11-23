import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CreatePostBody, UpdatePostBody, PostResponse } from "../types/TPost";

const prisma = new PrismaClient();

const parseId = (id: string) => {
    if (isNaN(parseInt(id))) {
        throw new Error("Id is not a number");
    }
    return parseInt(id);
};

const createPostResponse = (post: any): PostResponse => {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        authorId: post.authorId,
    };
};

const getPostsController = async (req: Request, res: Response<PostResponse[] | { error: string }>) => {
    try {
        const posts = await prisma.post.findMany({ include: { author: true } });
        const postResponse: PostResponse[] = posts.map(createPostResponse);
        res.json(postResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error occurred while retrieving posts." });
    }
};

const getPostController = async (req: Request<{ id: string }>, res: Response<PostResponse | { error: string }>) => {
    try {
        const parsedId = parseId(req.params.id);
        const post = await prisma.post.findUnique({ where: { id: parsedId }, include: { author: true } });

        if (post) {
            res.json(createPostResponse(post));
        } else {
            res.status(404).json({ error: `Post with id ${req.params.id} not found` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error occurred while retrieving post: " });
    }

};

const createPostController = async (req: Request<{}, {}, CreatePostBody>, res: Response<PostResponse | { error: string }>) => {
    const { title, content, published, authorId } = req.body;

    if (!title || authorId === undefined) {
        return res.status(400).json({ error: "Title and Author ID are required to create a post." });
    }

    try {
        const post = await prisma.post.create({
            data: { title, content, published, author: { connect: { id: authorId } } }
        });
        res.json(createPostResponse(post));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create post." });
    }
};

const updatePostController = async (req: Request<{ id: string }, {}, UpdatePostBody>, res: Response<PostResponse | { error: string }>) => {
    const { title, content, published } = req.body;

    try {
        const parsedId = parseId(req.params.id);
        const existingPost = await prisma.post.findUnique({ where: { id: parsedId } });

        if (!existingPost) {
            return res.status(404).json({ error: `Post with ID ${req.params.id} not found` });
        }

        if (!title && !content && published === undefined) {
            return res.status(400).json({ error: "At least one field (title, content, published) must be provided for update." });
        }

        const post = await prisma.post.update({
            where: { id: existingPost.id },
            data: { title: title ?? existingPost.title, content: content ?? existingPost.content, published: published ?? existingPost.published }
        });
        res.json(createPostResponse(post));
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update post with ID " + req.params.id });
    }
};

const deletePostController = async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    try {
        const parsedId = parseId(req.params.id);
        const existingPost = await prisma.post.findUnique({ where: { id: parsedId } });

        if (!existingPost) {
            return res.status(404).json({ error: `Post with ID ${req.params.id} not found` });
        }

        await prisma.post.delete({ where: { id: existingPost.id } });
        res.json({ message: `Successfully deleted post with ID ${req.params.id}` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to delete post with ID " + req.params.id });
    }
};

export { getPostsController, getPostController, createPostController, updatePostController, deletePostController };
