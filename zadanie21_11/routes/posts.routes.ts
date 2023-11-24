import express from 'express';
import { getPostsController, getPostController, createPostController, updatePostController, deletePostController, getPostsByAuthorController } from '../controllers/posts.controller';
const router = express.Router();

router.get('/', getPostsController);
router.get('/author/:id', getPostsByAuthorController);
router.post('/', createPostController);
router.put('/:id', updatePostController);
router.delete('/:id', deletePostController);
router.get('/:id', getPostController);


export default router;