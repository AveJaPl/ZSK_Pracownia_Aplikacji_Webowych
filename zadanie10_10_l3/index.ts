import pool from "./dbConfig";
import express, { Request, Response } from "express";
import BodyParser from "body-parser";
import path from "path";

const app = express();
const port = 3000;
const host = "localhost";

app.use(express.static(path.join(__dirname, "public")));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.send(`
    <h1>Witaj na stronie głównej</h1>
    <p>Dowolny tekst</p>
    `);
});

app.get("/kontakt", (req, res) => {
  const filePath = path.join(__dirname, "public", "html", "index.html");
  res.sendFile(filePath);
});

app.listen(port, host, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
