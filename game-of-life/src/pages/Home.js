import React, { useState } from "react";
import Grid from "../components/Grid";
import { useInterval } from "../hooks/useInterval";

function Home() {
  // State
  const [rows, setRows] = useState(40);
  const [cols, setCols] = useState(60);
  const [speed, setSpeed] = useState(100);
  const [interval, setInterval] = useState(null);
  const [generation, setGeneration] = useState(0);
  const [grid, setGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(cols).fill(false))
  );

  function selectBox(row, col) {
    let gridCopy = arrayClone(grid);
    gridCopy[row][col] = !gridCopy[row][col];
    setGrid(gridCopy);
  }

  function seed() {
    let gridCopy = arrayClone(grid);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setGrid(gridCopy);
  }

  function clearGrid() {
    let gridCopy = arrayClone(grid);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        gridCopy[i][j] = false;
      }
    }
    setGrid(gridCopy);
    setGeneration(0);
  }

  function playButton() {
    setInterval(speed);
  }

  function pauseButton() {
    setInterval(null);
  }

  function life() {
    let g2 = arrayClone(grid);
    // loop through each column of each row
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let currentCell = g2[i][j];
        // helper function looks at all eight neighbors
        let neighbors = countNeighbors(grid, i, j);
        // if current cell is dead and has 3 neighbors it comes to life
        if (currentCell === false && neighbors === 3) {
          g2[i][j] = true;
          // if current cell is alive and has less than 2 neighbors
          // or more than 3, the cell dies
        } else if (currentCell && (neighbors < 2 || neighbors > 3)) {
          g2[i][j] = false;
        } else {
          g2[i][j] = currentCell;
        }
      }
    }
    // update the grid to the grid copy
    setGrid(g2);
    setGeneration(generation + 1);
  }

  // Uncomment if you want to start with a seeded grid
  //   React.useEffect(() => {
  //     seed();
  //   }, []);

  useInterval(() => {
    life();
  }, interval);

  return (
    <>
      <h1>The Game of Life</h1>
      <div className="page-container">
        <div className="main">
          <div className="grid-container">
            <h2>Generations: {generation} </h2>
            <Grid grid={grid} rows={rows} cols={cols} selectBox={selectBox} />
            <div className="buttons">
              {interval === null ? (
                <button onClick={playButton}> Go </button>
              ) : null}
              {interval ? <button onClick={pauseButton}> Stop </button> : null}
              {interval === null ? (
                <button onClick={clearGrid}>Clear</button>
              ) : null}
              {interval === null ? (
                <button onClick={seed}>Randomize</button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="words">
            <h2> Rules </h2>
            <ul>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbors lives on to the next generation</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with three live neighbours becomes a live cell, as if by reproduction</li>
            </ul>
            <h2> About this Algorithm</h2>
            <p> The Game of Life is a cellular automation devised by British mathmetician John Horton Conway in 1970. A cellular automaton consists of a regular grid of cells, whith each cell being in a certain state, such as "dead" or "alive". In Conway's Game of Life, each cell looks at its eight neighbors to determine it's state. The grid is a two-dimensional array of rows and collumns. To look at neighbors I've built a for loop that runs through each column of each row and looks at each neighbor using a helper function. Using the count of neighbors, a copy of the grid updates it cells accordingly. When the loop has ran through the whole grid, the original grid is replaced with the copy. This is a double buffer and was implemented using the React useState hook.</p>
        </div>
      </div>
    </>
  );
}

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

// Looking at every neighbor
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
