import express from 'express';
import { getContactPage, insertData } from '../controllers/contact.controller';


const router = express.Router();

router.get("/", getContactPage)
router.post("/", insertData)

export default router;