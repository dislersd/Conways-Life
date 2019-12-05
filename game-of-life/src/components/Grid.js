import React from "react";
import Box from "./Box";

function Grid({ cols, rows, grid, selectBox }) {
  // width is collumns multiplied by 8 (because boxes are 8px wide)
  const width = cols * 8;
  var rowsArr = [];
  var boxClass = "";

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      let boxId = `${i}_${j}`;

      boxClass = grid[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={i}
          col={j}
          selectBox={selectBox}
        />
      );
    }
  }

  return (
    <div className="grid" style={{ width: width }}>
      {rowsArr}
    </div>
  );
}
export default Grid;
