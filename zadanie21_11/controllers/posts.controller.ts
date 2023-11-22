import {Response, Request} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPostsController = async (req: Request, res: Response) => {};
const getPostController = async (req: Request, res: Response) => {};
const createPostController = async (req: Request, res: Response) => {};
const updatePostController = async (req: Request, res: Response) => {};
const deletePostController = async (req: Request, res: Response) => {};


export { getPostsController, getPostController, createPostController, updatePostController, deletePostController };