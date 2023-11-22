import express from 'express';
import { getProfilesController, getProfileController, createProfileController, updateProfileController, deleteProfileController } from '../controllers/profiles.controller';

const router = express.Router();

router.get('/', getProfilesController);
router.post('/', createProfileController);
router.put('/:id', updateProfileController);
router.delete('/:id', deleteProfileController);
router.get('/:id', getProfileController);


export default router;