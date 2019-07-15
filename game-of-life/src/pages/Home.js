import React, { useState } from "react";
import Grid from "../components/Grid";

function Home() {
  const speed = 100;
  const rows = 30;
  const cols = 50;

  const [generation, setGeneration] = useState(0);
  const [gridFull, setGridFull] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  const selectBox = (row, col) => {
    let gridCopy = arrayClone(gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    setGridFull(gridCopy)
  };

  return (
    <div>
      <h1>The Game of Life</h1>
      <Grid gridFull={gridFull} rows={rows} cols={cols} selectBox={selectBox} />
      <h2>Generations: {generation} </h2>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

export default Home;
