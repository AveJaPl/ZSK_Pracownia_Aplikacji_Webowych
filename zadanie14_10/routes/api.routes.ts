import express from 'express';

const router = express.Router();

router.get("/students", (req: Request, res: Response) => {
    const sql = "SELECT * FROM students";
    pool.query(sql, (err: Error, result: IStudent[]) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      res.json(result as IStudent[]);
    });
  });
  
  router.get("/subjects", (req: Request, res: Response) => {
    const sql = "SELECT * FROM subjects";
    pool.query(sql, (err: Error, result: any) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }
      res.json(result as ISubject[]);
    });
  });
  
  router.get("/subjects/:id", (req: Request, res: Response) => {
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
  
  router.get("/students/:id", (req: Request, res: Response) => {
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
  

  export default router;