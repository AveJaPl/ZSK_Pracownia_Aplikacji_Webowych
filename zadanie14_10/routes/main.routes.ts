import express from 'express';
import { sendIndexFile } from '../controllers/main.controller';

const router = express.Router();

router.get("/", sendIndexFile);

export default router;
