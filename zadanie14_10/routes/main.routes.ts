import express from 'express';
import { insertData, sendIndexFile } from '../controllers/main.controller';

const router = express.Router();

router.get("/", sendIndexFile);
router.post("/", insertData);

export default router;
