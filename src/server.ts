import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;

// API info page
// app.get("/", (req, res) => {
//   const pathToFile = filePath("../public/index.html");
//   res.sendFile(pathToFile);
// });

// GET /stations  List all stations
app.get("/stations", (req, res) => {
  res.status(200).json({});
});

// GET /stations/:station1/:station2
app.get<{ id: string }>("/items/:id", (req, res) => {
  res.status(200).json({});
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
