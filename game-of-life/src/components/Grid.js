import React from "react";
import Box from "./Box";

function Grid({ cols, rows, gridFull, selectBox }) {
  var width = (cols * 14);
  var rowsArr = [];
  var boxClass = "";

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      let boxId = `${i}_${j}`;

      boxClass = gridFull[i][j] ? "box on" : "box off";
      rowsArr.push(
        <Box
          boxClass={boxClass}
          key={boxId}
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
