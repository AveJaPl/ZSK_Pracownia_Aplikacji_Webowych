import pool from "./dbConfig";
import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser";
import path from "path";
import IStudent from "./interfaces/IStudent";
import ISubject from "./interfaces/ISubject";
import IMessage from "./interfaces/IMessage";

const app: Express = express();
const port: number = 3000;
const host: string = "localhost";

app.use(express.static(path.join(__dirname, "public")));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.set("json spaces", 2);

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1>Witaj na stronie głównej</h1>
    <p>Dowolny tekst</p>
    `);
});

app.get("/kontakt", (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "public", "html", "index.html");
  res.sendFile(filePath);
});

app.post("/kontakt", (req: Request, res: Response) => {
  const { name, email, subject, message }: IMessage = req.body;

  const sql: string =
    "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";
  const values: (string | number)[] = [name, email, subject, message];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }

    console.log(result);
    res.redirect("/");
  });
});

app.get("/api/students", (req: Request, res: Response) => {
  const sql: string = "SELECT * FROM students";
  pool.query(sql, (err: Error, result: IStudent[]) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    res.json(result);
  });
});

app.get("/api/subjects", (req: Request, res: Response) => {
  const sql: string = "SELECT * FROM subjects";
  pool.query(sql, (err: Error, result: ISubject[]) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    res.json(result);
  });
});

app.listen(port, host, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
