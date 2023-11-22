import express from 'express';
import { getCommentsController, getCommentController, createCommentController, updateCommentController, deleteCommentController } from '../controllers/comments.controller';

const router = express.Router();

router.get('/', getCommentsController);
router.post('/', createCommentController);
router.put('/:id', updateCommentController);
router.delete('/:id', deleteCommentController);
router.get('/:id', getCommentController);


export default router;