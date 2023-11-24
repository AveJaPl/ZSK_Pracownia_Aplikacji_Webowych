import express from 'express';
import { getCommentsController, getCommentController, createCommentController, updateCommentController, deleteCommentController, getCommentsByAuthorController } from '../controllers/comments.controller';

const router = express.Router();

router.get('/', getCommentsController);
router.get('/author/:id', getCommentsByAuthorController);
router.post('/', createCommentController);
router.put('/:id', updateCommentController);
router.delete('/:id', deleteCommentController);
router.get('/:id', getCommentController);


export default router;