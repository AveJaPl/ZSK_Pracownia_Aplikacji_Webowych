import express from 'express';
import path from 'path';
import { Request, Response } from "express";
import { client } from "../dbConfig";
import { IMessage } from "../interfaces/IMessage";


const getContactPage = (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "..", "public", "html", "index.html");
    res.sendFile(filePath);
};
const insertData = async (req: Request, res: Response) => {
    const { name, email, subject, message }: IMessage = req.body;
    const document: IMessage = { name, email, subject, message };
    if(!name?.trim()){
        delete document.name;
    }
    try {
        const db = client.db("school")
        const collection = db.collection("contact")

        await collection.insertOne(document)
        res.redirect("/")
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}
export { insertData, getContactPage };

