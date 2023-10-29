import pool from "./dbConfig";
import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser";
import path from "path";
import IStudent from "./interfaces/IStudent";
import ISubject from "./interfaces/ISubject";
import IMessage from "./interfaces/IMessage";

const app: Express = express();
const port = 3000;
const host = "localhost";

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

  const sql =
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
  const sql = "SELECT * FROM students";
  pool.query(sql, (err: Error, result: IStudent[]) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    res.json(result as IStudent[]);
  });
});

app.get("/api/subjects", (req: Request, res: Response) => {
  const sql = "SELECT * FROM subjects";
  pool.query(sql, (err: Error, result: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    res.json(result as ISubject[]);
  });
});

app.get("/api/subjects/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const sql = "SELECT * FROM subjects WHERE id = ?";
  const values: number[] = [id];

  pool.query(sql, values, (err: Error | null, result: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    if (result.length === 0) {
      return res.status(404).send("Not Found");
    }
    

    const subject: ISubject = result[0] as ISubject;
    res.json(subject);
  });
});

app.get("/api/students/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const sql = "SELECT * FROM students WHERE id = ?";
  const values: number[] = [id];

  pool.query(sql, values, (err: Error | null, result: any) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal server error");
    }
    if (result.length === 0) {
      return res.status(404).send("Not Found");
    }
    
    const student: ISubject = result[0] as ISubject;
    res.json(student);
  });
});

app.listen(port, host, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
