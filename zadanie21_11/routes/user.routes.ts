import express from 'express';
import { getUsersController, getUserController, createUserController, updateUserController, deleteUserController } from '../controllers/users.controller';

const router = express.Router();

router.get('/', getUsersController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);
router.get('/:id', getUserController);


export default router;