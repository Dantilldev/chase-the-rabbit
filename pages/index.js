import { useState, useEffect } from "react";
import { Press_Start_2P } from "next/font/google";

//  Todos😀
// 1. Om ormen äter upp kaninen så ska den bli längre
// 2. Lägga till så att kaninen bara syns på skärmen nör spelet har startat och så att den bara syns ifall
// 3. Ifall ormen går utanför skärmen i x-led så ska den flyttas till andra sidan på spel-blocket
// 4. Poäng system för varje gång den äter upp en kanin
// 5. Svårighetsgrad exempel: om ma har 10 poäng så ökar hastigheten
// 6. Bakgrundmuisk med mute knapp
// 7. Ljud effekt för varje gång den käkar en kanin(poäng), gameover,start game,
// 8. Deisgna första sidan: spelinstriktioner, start game, highscore
// 9. Localstorage med highscore function
// 10. Responsive desgn

const pixelFont = Press_Start_2P({
  // Pixel font
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Postion för Snake
  const [direction, setDirection] = useState("down-direction"); // Riktning för Snake
  const [isPlaying, setIsPlaying] = useState(false); // Om spelet är igång
  const [speed, setSpeed] = useState(10); // Speed för Snake
  const [rabbitPos, setRabbitPos] = useState({}); // Postion för Rabbit

  useEffect(() => {
    setRabbitPos({ x: Math.random() * 565, y: Math.random() * 565 });
  }, []);

  // Funtion som tar hand om riktningen
  function HandleAutoDirection() {
    switch (direction) {
      case "down-direction":
        return setPosition((prev) => ({ ...prev, y: prev.y + speed })); // Gå ner
      case "up-direction":
        return setPosition((prev) => ({ ...prev, y: prev.y - speed })); // Gå upp
      case "right-direction":
        return setPosition((prev) => ({ ...prev, x: prev.x + speed })); // Gå höger
      case "left-direction":
        return setPosition((prev) => ({ ...prev, x: prev.x - speed })); // Gå vänster
      default:
        return;
    }
  }

  function handleDirection(e) {
    // clearInterval(directionInterval);

    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      // Y led uppåt
      setDirection((prev) => {
        if (prev === "down-direction") {
          return prev;
        }
        return "up-direction";
      });
    } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      // Y led neddåtswsws
      setDirection((prev) => {
        if (prev === "up-direction") {
          return prev;
        }
        return "down-direction";
      });
    } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      // X led vänster
      setDirection((prev) => {
        if (prev === "right-direction") {
          return prev;
        }
        return "left-direction";
      });
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      // X led höger

      setDirection((prev) => {
        if (prev === "left-direction") {
          console.log("prev: ");
          return prev;
        }
        return "right-direction";
      });
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
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <h1 className={`text-4xl mb-10 ${pixelFont.className} `}>Snake Game</h1>

      <div className="flex justify-center items-center w-[600px] h-[600px] relative border-8 overflow-hidden">
        <div
          className="w-[20px] h-[20px] absolute"
          style={{
            top: rabbitPos.y, // säkerställ att den är inom containern
            left: rabbitPos.x, // säkerställ att den är inom containern
          }}
        >
          {" "}
          🐇{" "}
        </div>
        {isPlaying ? (
          <div
            className="w-[20px] h-[20px] bg-green-400 absolute"
            style={{
              top: `${Math.max(0, Math.min(position.y, 565))}px`, // går inte utanför containern
              left: `${Math.max(0, Math.min(position.x, 565))}px`, // går inte utanför containern
            }}
          ></div>
        ) : (
          <button
            onClick={() => {
              setPosition({ y: 300, x: 300 });
              setIsPlaying(true);
            }}
            className="bg-green-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all"
          >
            Start Game
          </button>
        )}
      </div>
      <p className={`text-1xl mb-10 ${pixelFont.className}`}>Score: 0</p>
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
