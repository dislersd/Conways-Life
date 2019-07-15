import React from "react";

function Box({ row, col, boxClass, id, selectBox }) {
  const selectBoxTwo = () => {
    selectBox(row, col);
  };

  return <div className={boxClass} id={id} onClick={selectBoxTwo} />;
}
export default Box;
