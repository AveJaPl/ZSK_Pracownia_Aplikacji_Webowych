import express from 'express';
import { getListOfStudents, getStudentById, getListOfSubjects, getSubjectById } from '../controllers/api.controller';

const router = express.Router();

router.get('/students', getListOfStudents)
router.get('/students/:id', getStudentById)
router.get('/subjects', getListOfSubjects)
router.get('/subjects/:id', getSubjectById)

export default router;