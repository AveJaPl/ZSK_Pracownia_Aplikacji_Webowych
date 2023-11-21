import express from 'express';
import {getListOfMessages, getListOfStudents, getStudentById, getListOfSubjects, getSubjectById } from '../controllers/api.controller';

const router = express.Router();

router.get('/students', getListOfStudents)
router.get('/students/:id', getStudentById)
router.get('/subjects', getListOfSubjects)
router.get('/subjects/:id', getSubjectById)
router.get('/messages', getListOfMessages)

export default router;