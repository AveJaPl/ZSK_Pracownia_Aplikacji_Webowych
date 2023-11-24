import { Response, Request } from "express";
import { randDataModel } from "../data.schema";
import { connectToDatabase } from "../db.config";

const createRandomDataController = async (req: Request, res: Response) => {
    try {
        await connectToDatabase()
        const { key, value } = req.body;
        const newData = new randDataModel({ key, value });
        console.log(newData);
        const createdData = await newData.save();
        console.log(createdData);
        res.status(201).json(createdData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default createRandomDataController;