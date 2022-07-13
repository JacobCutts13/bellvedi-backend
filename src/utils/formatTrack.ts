import * as path from "path";
import { parse } from "csv-parse";
import * as fs from "fs";
import { Nodes, Track } from "../interfaces";

const csvFilePath = path.resolve(__dirname, "../data/tracks.csv");

const readCSV: Promise<Track[]> = new Promise((resolve, reject) => {
    const tracks: Track[] = [];
    fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ",", columns: true, from_line: 1, ltrim: true }))
        .on("data", function (row) {
            const track: Track = {
                from: row.FROM_TIPLOC,
                to: row.TO_TIPLOC,
                distance: row.DISTANCE,
                electric: row.ELECTRIC,
                passengerUse: row.PASSENGER_USE,
                lineCode: row.LINE_CODE,
            };
            tracks.push(track);
        })
        .on("error", function (error) {
            console.log(error.message);
            reject(error);
        })
        .on("end", function () {
            console.log("Read all tracks");
        });
    resolve(tracks);
});

export default async function formatTracks(): Promise<Nodes> {
    try {
        console.log("getting tracks");
        const tracks = await readCSV;
        console.log("number of tracks: ", tracks.length);
        const nodes: Nodes = {};
        tracks.forEach((track) => {
            if (track.distance <= 0) return;
            //if node does not exist create it
            if (typeof nodes[track.from] === "undefined") {
                nodes[track.from] = { [track.to]: track.distance };
            } else {
                nodes[track.from][track.to] = track.distance;
            }
        });
        return nodes;
    } catch (error) {
        console.error(error);
        return {};
    }
}
