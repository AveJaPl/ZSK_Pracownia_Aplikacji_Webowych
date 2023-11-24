import express from 'express';
import createRandomDataController from '../controllers/randomData.controller';

const router = express.Router();

router.post('/', createRandomDataController);

export default router;