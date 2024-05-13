import "reflect-metadata";
import express, { Request, Response } from "express";
import datasource from "./datasource/dataSource";

const PORT = 8000;
const app = express();

datasource
  .initialize()
  .then(() => {
    console.log(`Datasource connect sucessfully database`);
  })
  .catch((error) => {
    console.log(`Error during connecting database`, error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
