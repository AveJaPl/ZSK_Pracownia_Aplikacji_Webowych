import { Response, Request } from "express";
import { DataModel } from "../data.schema";

const createRandomDataController = async (req: Request, res: Response) => {
    try {
        const { key, value } = req.body;
        const newData = new DataModel({ key, value });
        const createdData = await newData.save();
        res.status(201).json(createdData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default createRandomDataController;