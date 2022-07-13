import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Graph from "node-dijkstra";
import formatTracks from "./utils/formatTrack";
import { StringifyOptions } from "querystring";

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
app.get("/stations", async (req, res) => {
  try {
    console.log("got a all stations req");
    const nodes = await formatTracks();
    res.status(200).json(Object.keys(nodes));
  } catch (err) {
    console.error(err);
    res.status(500).send("Couldnt get track data");
  }
});

// GET /stations/:station1/:station2
app.get<{ station1: string; station2: StringifyOptions }>(
  "/stations/:station1/:station2",
  async (req, res) => {
    try {
      console.log(
        "req for shortest distance from and to",
        req.params.station1,
        req.params.station2
      );
      const nodes = await formatTracks();
      const routes = new Graph();
      Object.keys(nodes).forEach((key) => {
        routes.addNode(key, nodes[key]);
      });
      const path = routes.path(req.params.station1, req.params.station2, {
        cost: true,
      });
      res.status(200).json(path);
    } catch (error) {
      console.error(error);
      res.status(500).send("Couldnt calculate shortest route");
    }
  }
);

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
