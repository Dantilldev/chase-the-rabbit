import {useState, useEffect} from "react";

export default function Character3({snakeHead, changeDirection}) {
  const colors = [
    "blue",
    "green",
    "purple",
    "orange",
    "gold",
    "pink",
    "red",
    "black",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-[20px] h-[20px] bg-green-400 absolute  transition-all ease-out duration-150 top-[100px] right-[100px] ${changeDirection}`}
      style={{
        backgroundColor: colors[colorIndex],
        top: `${Math.max(0, Math.min(snakeHead.y, 565))}px`, // går inte utanför containern
        left: `${Math.max(0, Math.min(snakeHead.x, 565))}px`, // går inte utanför containern
      }}
    >
      <div className="bg-red-800 w-[2px] h-[6px] bottom-0 left-0 absolute"></div>
      <div className="bg-red-800 w-[2px] h-[6px] top-0 left-0 absolute"></div>

      <div
        className="absolute bottom-2 left-2 bg-transparent"
        style={{
          width: "18px",
          height: "2px",
          borderTop: "2px solid red", // Mouth border
          borderRadius: "0 0 8px 8px", // Make it look like a smiling mouth
          transform: "rotate(180deg)", // Flip the mouth to face downwards
          backgroundColor: colors[colorIndex],
        }}
      />
    </div>
  );
}
