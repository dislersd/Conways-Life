import React, { useState, useEffect } from "react";
import Grid from "../components/Grid";
import { useInterval } from "../hooks/useInterval";

function Home() {
  const [rows, setRows] = useState(30);
  const [cols, setCols] = useState(50);
  const [speed, setSpeed] = useState(150);
  const [interval, setInterval] = useState(null);
  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  const selectBox = (row, col) => {
    let gridCopy = arrayClone(grid);
    gridCopy[row][col] = !gridCopy[row][col];
    setGrid(gridCopy);
  };

  const seed = () => {
    let gridCopy = arrayClone(grid);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setGrid(gridCopy);
  };

  async function clearGrid() {
    let gridCopy = arrayClone(grid);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    setGrid(gridCopy);
    seed()
  }

  useEffect(() => {
    seed();
  }, []);

  useInterval(() => {
    life();
  }, interval);

  function playButton() {
    setInterval(speed);
  }

  function pauseButton() {
    setInterval(null);
  }

  function randomize() {
    clearGrid();
  }

  function life() {
    let g2 = arrayClone(grid);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let state = g2[i][j];
        let neighbors = countNeighbors(grid, i, j);

        if (state === false && neighbors === 3) {
          g2[i][j] = true;
        } else if (state && (neighbors < 2 || neighbors > 3)) {
          g2[i][j] = false;
        } else {
          g2[i][j] = state;
        }
      }
    }
    setGrid(g2);
    setGeneration(generation + 1);
  }

  return (
    <div>
      <h1>The Game of Life</h1>
      <div className="main">
          <div className="buttons">
              <button onClick={playButton}>Play</button>
              <button onClick={pauseButton}>Pause</button>
              <button onClick={randomize}>Randomize</button>
          </div>
          <Grid grid={grid} rows={rows} cols={cols} selectBox={selectBox} />
      </div>
      <h2>Generations: {generation} </h2>
    </div>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function countNeighbors(grid, x, y) {
  const size = grid.length;
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + size) % size;
      let row = (y + j + size) % size;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

export default Home;
