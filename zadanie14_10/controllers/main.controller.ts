import { Request, Response } from "express";

const sendIndexFile = (req: Request, res: Response) => {
  res.send(`
    <h1>Witaj na stronie głównej</h1>
    <p>Dowolny tekst</p>
    `);
};

export {
  sendIndexFile
}