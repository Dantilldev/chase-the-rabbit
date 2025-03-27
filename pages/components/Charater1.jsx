export default function Character1({changeDirection, snakeHead}) {
  return (
    <div
      className={`w-[20px] h-[20px] bg-green-400 absolute  transition-all ease-out duration-150 top-[100px] right-[100px] ${changeDirection} `}
      style={{
        top: `${Math.max(0, Math.min(snakeHead.y, 565))}px`, // går inte utanför containern
        left: `${Math.max(0, Math.min(snakeHead.x, 565))}px`, // går inte utanför containern
      }}
    >
      <div className="bg-red-500 w-[2px] h-[6px] bottom-0 left-0 absolute"></div>
      <div className="bg-red-500 w-[2px] h-[6px] top-0 left-0 absolute"></div>

      <div
        className="absolute bottom-2 left-2 bg-transparent"
        style={{
          width: "16px",
          height: "8px",
          borderTop: "2px solid red", // Mouth border
          borderRadius: "0 0 8px 8px", // Make it look like a smiling mouth
          transform: "rotate(180deg)", // Flip the mouth to face downwards
        }}
      />
    </div>
  );
}
