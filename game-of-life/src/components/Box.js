import React from "react";

function Box({ row, col, boxClass, id, selectBox }) {
  
    const changeBox = () => {
    selectBox(row, col);
  };

  return <div className={boxClass} id={id} onClick={changeBox} />;
}
export default Box;
