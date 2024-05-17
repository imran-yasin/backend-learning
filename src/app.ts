import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import datasource from "./datasource/dataSource";
import { Sector } from "./entities/Sectors.entity";
import authRoutes from "./authRoutes";
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

// app.use("/", (req: Request, res: Response) => {
//   res.send("Hello World");
// });

app.use("/auth", authRoutes);

// Route to get all sectors
app.get("/sectors", async (req: Request, res: Response) => {
  try {
    const sectors = await datasource.getRepository(Sector).find();
    return res.json({
      status: true,
      message: `${sectors.length} sectors fetched successfully`,
      data: sectors,
    });
  } catch (error) {
    console.error("Error retrieving sectors:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to get a sector by ID
app.get("/sector/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const sector = await datasource
      .getRepository(Sector)
      .findOne({ where: { id } });
    if (!sector) {
      return res.status(404).json({
        status: false,
        message: "Sector not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sector fetched successfully",
      data: sector,
    });
  } catch (error) {
    console.error("Error retrieving sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to create a new sector
app.post("/sector", async (req: Request, res: Response) => {
  try {
    const newSector = await datasource.getRepository(Sector).save(req.body);
    return res.status(201).json({
      status: true,
      message: "Sector created successfully",
      data: newSector,
    });
  } catch (error) {
    console.error("Error creating sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to update a sector
app.patch("/sector/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const sectorRepository = datasource.getRepository(Sector);
    const sector = await sectorRepository.findOne({ where: { id } });

    if (!sector) {
      return res.status(404).json({
        status: false,
        message: "Sector not found",
      });
    }

    // Update sector with new data from request body
    sectorRepository.merge(sector, req.body);

    // Save the updated sector back to the database
    const updatedSector = await sectorRepository.save(sector);

    return res.status(200).json({
      status: true,
      message: "Sector updated successfully",
      data: updatedSector,
    });
  } catch (error) {
    console.error("Error updating sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Route to delete a sector
app.delete("/sector/:id", async (req: Request, res: Response) => {
  console.log("id", req.params.id);
  try {
    const id: number = parseInt(req.params.id);
    const deleteResult = await datasource.getRepository(Sector).delete(id);
    if (!deleteResult.affected) {
      return res.status(404).json({
        status: false,
        message: "Sector not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sector deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sector:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
