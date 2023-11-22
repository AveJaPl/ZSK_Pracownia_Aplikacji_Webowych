import express from 'express';
import { getPostsController, getPostController, createPostController, updatePostController, deletePostController } from '../controllers/posts.controller';

const router = express.Router();

router.get('/', getPostsController);
router.post('/', createPostController);
router.put('/:id', updatePostController);
router.delete('/:id', deletePostController);
router.get('/:id', getPostController);


export default router;