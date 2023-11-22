import {Response, Request} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCategoriesController = async (req: Request, res: Response) => {};
const getCategoryController = async (req: Request, res: Response) => {};
const createCategoryController = async (req: Request, res: Response) => {};
const updateCategoryController = async (req: Request, res: Response) => {};
const deleteCategoryController = async (req: Request, res: Response) => {};


export { getCategoriesController, getCategoryController, createCategoryController, updateCategoryController, deleteCategoryController };