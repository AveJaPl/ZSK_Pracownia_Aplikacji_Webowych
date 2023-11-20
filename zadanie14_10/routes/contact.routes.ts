import express from 'express';


const router = express.Router();

app.get("/", (req: Request, res: Response) => {
    const filePath = path.join(__dirname, "public", "html", "index.html");
    res.sendFile(filePath);
  });
  
  app.post("/", (req: Request, res: Response) => {
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

  export default router;