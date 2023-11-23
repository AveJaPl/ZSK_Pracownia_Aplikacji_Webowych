import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateCategoryBody, UpdateCategoryBody, CategoryResponse } from "../types/TCategory";

const prisma = new PrismaClient();

const parseId = (id: string) => {
    if (isNaN(parseInt(id))) {
        throw new Error("Id is not a number");
    }
    return parseInt(id);
};

const createCategoryResponse = (category: any): CategoryResponse => {
    return {
        id: category.id,
        name: category.name,
    };
};

const getCategoriesController = async (req: Request, res: Response<CategoryResponse[] | { error: string }>) => {
    try {
        const categories = await prisma.category.findMany();
        const categoryResponse: CategoryResponse[] = categories.map(createCategoryResponse);
        res.json(categoryResponse);
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas pobierania kategorii." });
    }
};

const getCategoryController = async (req: Request<{ id: string }>, res: Response<CategoryResponse | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const category = await prisma.category.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (category) {
            const categoryResponse: CategoryResponse = createCategoryResponse(category);
            res.json(categoryResponse);
        } else {
            res.status(404).json({ error: `Category with id ${id} not found` });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while retrieving the category." });
    }
};

const createCategoryController = async (req: Request<{}, {}, CreateCategoryBody>, res: Response<CategoryResponse | { error: string }>) => {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: {
                name,
            },
        });

        const categoryResponse: CategoryResponse = createCategoryResponse(category);
        res.json(categoryResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the category." });
    }
};

const updateCategoryController = async (req: Request<{ id: string }, {}, UpdateCategoryBody>, res: Response<CategoryResponse | { error: string }>) => {
    const { id } = req.params;
    const { name } = req.body;
    const parsedId = parseId(id);

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingCategory) {
            return res.status(404).json({ error: `Category with id ${id} not found` });
        }

        const category = await prisma.category.update({
            where: {
                id: existingCategory.id,
            },
            data: {
                name,
            },
        });

        const categoryResponse: CategoryResponse = createCategoryResponse(category);
        res.json(categoryResponse);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the category." });
    }
};

const deleteCategoryController = async (req: Request<{ id: string }>, res: Response<{ message: string } | { error: string }>) => {
    const { id } = req.params;
    const parsedId = parseId(id);

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                id: parsedId,
            },
        });

        if (!existingCategory) {
            return res.status(404).json({ error: `Category with id ${id} not found` });
        }

        await prisma.category.delete({
            where: {
                id: existingCategory.id,
            },
        });

        res.json({ message: `Category with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the category." });
    }
};

export { getCategoriesController, getCategoryController, createCategoryController, updateCategoryController, deleteCategoryController };
