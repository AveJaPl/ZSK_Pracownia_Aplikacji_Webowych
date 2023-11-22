import {Response, Request} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCommentsController = async (req: Request, res: Response) => {}
const getCommentController = async (req: Request, res: Response) => {}
const createCommentController = async (req: Request, res: Response) => {}
const updateCommentController = async (req: Request, res: Response) => {}
const deleteCommentController = async (req: Request, res: Response) => {}


export { getCommentsController, getCommentController, createCommentController, updateCommentController, deleteCommentController };