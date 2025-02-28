import {useState, useEffect} from "react";

export default function Home() {
  const [position, setPosition] = useState({x: 0, y: 0}); // Postion för Snake
  const [direction, setDirection] = useState("down-direction"); // Riktning för Snake
  const [isPlaying, setIsPlaying] = useState(false); // Om spelet är igång
  const [speed, setSpeed] = useState(15); // Speed för Snake

  // Funtion som tar hand om riktningen
  function HandleAutoDirection() {
    switch (direction) {
      case "down-direction":
        return setPosition((prev) => ({...prev, y: prev.y + speed})); // Move down
      case "up-direction":
        return setPosition((prev) => ({...prev, y: prev.y - speed})); // Move up
      case "right-direction":
        return setPosition((prev) => ({...prev, x: prev.x + speed})); // Move rightw
      case "left-direction":
        return setPosition((prev) => ({...prev, x: prev.x - speed})); // Move leftd
      default:
        return;
    }
  }

  function handleDirection(e) {
    // clearInterval(directionInterval);

    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      // Y led uppåt

      setDirection("up-direction");
    } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      // Y led neddåt

      setDirection("down-direction");
    } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      // X led vänster

      setDirection("left-direction");
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      // X led Höger

      setDirection("right-direction");
    }
  }

  useEffect(() => {
    const directionInterval = setInterval(() => {
      HandleAutoDirection();
    }, 100);

    return () => clearInterval(directionInterval);
  }, [direction]);

  // Lyssnar på Keydown
  useEffect(() => {
    window.removeEventListener("keydown", handleDirection);
    window.addEventListener("keydown", handleDirection);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Snake Game</h1>
      <div className="flex justify-center items-center w-[600px] h-[600px] relative border-8 overflow-hidden">
        <div> 🐇 </div>
        {isPlaying ? (
          <div
            className="w-[20px] h-[20px] bg-green-400"
            style={{
              position: "absolute",
              top: `${position.y}px`,
              left: `${position.x}px`,
            }}
          ></div>
        ) : (
          <button
            onClick={() => {
              setPosition({y: 300, x: 300});
              setIsPlaying(true);
            }}
            className="bg-green-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all"
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}

// const spriteRect = currentCharacter.getBoundingClientRect();
//   const obstacleRect = sprite.getBoundingClientRect();

//   // Check if there’s an overlap.
//   if (
//     spriteRect.left < obstacleRect.right &&
//     spriteRect.right > obstacleRect.left &&
//     spriteRect.top < obstacleRect.bottom &&
//     spriteRect.bottom > obstacleRect.top
//   ) {

// Funtion som tar hand om riktningen

// function HandleAutoDirection() {
//   setPosition((prev) => {
//     let newPosition = {...prev};

//     switch (direction) {
//       case "down-direction":
//         newPosition.y = prev.y + speed;
//         break;
//       case "up-direction":
//         newPosition.y = prev.y - speed;
//         break;
//       case "right-direction":
//         newPosition.x = prev.x + speed;
//         break;
//       case "left-direction":
//         newPosition.x = prev.x - speed;
//         break;
//       default:
//         break;
//     }

//     // Se till att den gröna div-en inte går utanför containern
//     newPosition.x = Math.max(0, Math.min(newPosition.x, 565)); // Max 580px för att hålla den inom 600px containeren
//     newPosition.y = Math.max(0, Math.min(newPosition.y, 565)); // Max 580px för att hålla den inom 600px containeren

//     return newPosition;
//   });
// }
