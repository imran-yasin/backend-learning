import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import datasource from "./datasource/dataSource";
import { Sector } from "./entities/Sectors.entity";

const PORT = 8000;
const app = express();

// Middleware to parse request body
app.use(express.json());

datasource
  .initialize()
  .then(() => {
    console.log(`Datasource connected successfully to the database`);
  })
  .catch((error) => {
    console.error(`Error during connecting database`, error);
  });

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Route to get all sectors
app.get("/sectors", async (req: Request, res: Response) => {
  try {
    const sectors = await datasource.getRepository(Sector).find();
    return res.json(sectors);
  } catch (error) {
    console.error("Error retrieving sectors:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to get a sector by ID
// app.get("/sector/:id", async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);
//     const sector = await datasource.getRepository(Sector).findOne(id);
//     if (!sector) {
//       return res.status(404).send("Sector not found");
//     }
//     return res.json(sector);
//   } catch (error) {
//     console.error("Error retrieving sector:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

// Route to create a new sector
app.post("/sector", async (req: Request, res: Response) => {
  try {
    const newSector = await datasource.getRepository(Sector).save(req.body);
    return res.status(201).json(newSector);
  } catch (error) {
    console.error("Error creating sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update a sector
// app.get("/sector/:id", async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id);
//     const sector = await datasource.getRepository(Sector).findOne(id);
//     if (!sector) {
//       return res.status(404).send("Sector not found");
//     }
//     return res.json(sector);
//   } catch (error) {
//     console.error("Error retrieving sector:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// });

// Route to delete a sector
app.delete("/sector/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const deleteResult = await datasource.getRepository(Sector).delete(id);
    if (!deleteResult.affected) {
      return res.status(404).send("Sector not found");
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
