import { useState } from "react";

export const Square = ({
  children,
  index,
  isSelected,
  updateBoard,
  isFilled,
  turn,
}) => {
  const [hover, setHover] = useState("");
  const myClass = isSelected ? "square bg-class" : "square";
  let squareTextClass = isFilled ? "square-text" : "square-text opacity";

  function addHover() {
    return !isFilled ? setHover(turn) : "";
  }

  return (
    <div
      onMouseEnter={addHover}
      onMouseLeave={() => setHover("")}
      onClick={() => updateBoard(index)}
      className={myClass}
      key={index}
    >
      <p className={squareTextClass}>{children ? children : hover}</p>
    </div>
  );
};
