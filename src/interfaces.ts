export interface Track {
  from: string;
  to: string;
  distance: number;
  electric: "Y" | "N" | "?";
  passengerUse: "Y" | "N" | "?";
  lineCode: string;
}

export interface Nodes {
  [station: string]: {
    [neighbour: string]: number;
  };
}
