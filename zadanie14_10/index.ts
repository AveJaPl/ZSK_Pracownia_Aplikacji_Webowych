import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser";
import path from "path";
import contactRoutes from "./routes/contact.routes";
import mainRoutes from "./routes/main.routes";
import apiRoutes from "./routes/api.routes";
const app: Express = express();
const port = 3000;
const host = "localhost";

app.use(express.static(path.join(__dirname, "public")));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.set("json spaces", 2);

app.use("/", mainRoutes)
app.use("/kontakt", contactRoutes)
app.use('/api', apiRoutes)

app.listen(port, host, () => {
  console.log(`Serwer działa pod adresem http://${host}:${port}`);
});
