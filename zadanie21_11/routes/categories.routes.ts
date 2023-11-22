import express from 'express';
import { getCategoriesController, getCategoryController, createCategoryController, updateCategoryController, deleteCategoryController } from '../controllers/categories.controller';

const router = express.Router();

router.get('/', getCategoriesController);
router.post('/', createCategoryController);
router.put('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);
router.get('/:id', getCategoryController);


export default router;