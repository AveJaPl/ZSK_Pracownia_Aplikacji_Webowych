import {Response, Request} from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProfilesController = async (req: Request, res: Response) => {}
const getProfileController = async (req: Request, res: Response) => {}
const createProfileController = async (req: Request, res: Response) => {}
const updateProfileController = async (req: Request, res: Response) => {}
const deleteProfileController = async (req: Request, res: Response) => {}


export { getProfilesController, getProfileController, createProfileController, updateProfileController, deleteProfileController };