import { Request, Response } from "express";
import { client } from "../dbConfig";

const db = client.db("school");

const getListOfSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await db.collection("subjects").find().toArray();
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

const getSubjectById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {

        return res.status(400).send("Invalid ID format");
    }

    try {
        const subject = await db.collection("subjects").findOne({ id: id });
        if (subject === null) {
            return res.status(404).send("Not Found");
        }
        res.json(subject);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

const getListOfStudents = async (req: Request, res: Response) => {
    try {
        const students = await db.collection("students").find().toArray();
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

const getStudentById = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    if (isNaN(id)) {

        return res.status(400).send("Invalid ID format");
    }

    try {
        const student = await db.collection("students").findOne({ id: id });
        if (student === null) {
            return res.status(404).send("Not Found");
        }
        res.json(student);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export {
    getListOfSubjects,
    getSubjectById,
    getListOfStudents,
    getStudentById
}