import {useState, useEffect} from "react";
import {Press_Start_2P} from "next/font/google";

//  Todos😀
// 1. Fixa så att kaninen inte kan spawna i röda blocken
// 2. Fixa collison mellan ormen och blocket.
// 3. Bakgrundmuisk med mute knapp
// 4. Ljud effekt för varje gång den käkar en kanin(poäng), gameover,start game,
// 5. Deisgna första sidan: spelinstriktioner, start game, highscore
// 6. Localstorage med highscore function
// 7. Responsive desgn

// Pixel font
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [snakeHead, setSnakeHead] = useState({x: 0, y: 0}); // Postion för Snake
  const [direction, setDirection] = useState("down-direction"); // Riktning för Snake
  const [isPlaying, setIsPlaying] = useState(false); // Om spelet är igång
  const [speed, setSpeed] = useState(10); // Speed för Snake
  const [score, setScore] = useState(0);
  const [rabbitPos, setRabbitPos] = useState({}); // Postion för Rabbit
  const [gameover, setGameOver] = useState(false);
  const [obstacle, setObstacle] = useState({x: 0, y: 0});
  const [addObstacle, setAddObstacle] = useState([]);

  useEffect(() => {
    setRabbitPos({x: Math.random() * 565, y: Math.random() * 565});
    setObstacle({x: Math.random() * 565, y: Math.random() * 565});
  }, []);

  // Funtion som tar hand om riktningen
  function HandleAutoDirection() {
    switch (direction) {
      case "down-direction":
        return setSnakeHead((prev) => ({...prev, y: prev.y + speed})); // Gå ner
      case "up-direction":
        return setSnakeHead((prev) => ({...prev, y: prev.y - speed})); // Gå upp
      case "right-direction":
        return setSnakeHead((prev) => ({...prev, x: prev.x + speed})); // Gå höger
      case "left-direction":
        return setSnakeHead((prev) => ({...prev, x: prev.x - speed})); // Gå vänster
      default:
        return;
    }
  }

  // Y led uppåt || Y led neddåt || X led vänster || X led höger
  function handleDirection(e) {
    if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
      setDirection((prev) => {
        if (prev === "down-direction") {
          return prev;
        }
        return "up-direction";
      });
    } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
      setDirection((prev) => {
        if (prev === "up-direction") {
          return prev;
        }
        return "down-direction";
      });
    } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      setDirection((prev) => {
        if (prev === "right-direction") {
          return prev;
        }
        return "left-direction";
      });
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      setDirection((prev) => {
        if (prev === "left-direction") {
          console.log("prev: ");
          return prev;
        }
        return "right-direction";
      });
    }
  }

  function updateSpeed() {
    if (score >= 8 && score <= 12) {
      setSpeed(12);
    } else if (score > 12 && score <= 17) {
      setSpeed(15);
    } else if (score > 17 && score < 35) {
      setSpeed(18);
    }
  }

  function HandleAddObstacle() {
    setAddObstacle([
      ...addObstacle,
      {x: Math.random() * 565, y: Math.random() * 565},
    ]);
  }

  // checkar om ormen krockar med Obsatcles
  function checkCollision() {
    for (let i = 0; i < addObstacle.length; i++) {
      if (
        Math.abs(snakeHead.x - addObstacle[i].x) < 20 &&
        Math.abs(snakeHead.y - addObstacle[i].y) < 20
      ) {
        setSpeed(10);
        setIsPlaying(false);
        setAddObstacle([]);
        setScore(0);
        setGameOver(true);
        break;
      }
    }
  }

  // Funktion för att äta upp kaninen
  function eatRabbit() {
    if (
      Math.abs(snakeHead.x - rabbitPos.x) < 15 &&
      Math.abs(snakeHead.y - rabbitPos.y) < 15
    ) {
      setRabbitPos({
        x: Math.floor(Math.random() * 565),
        y: Math.floor(Math.random() * 565),
      });

      setScore(score + 1);
      HandleAddObstacle();
      checkCollision();
    } else if (
      snakeHead.x > 575 ||
      snakeHead.y > 575 ||
      snakeHead.x < -5 ||
      snakeHead.y < -5
    ) {
      setAddObstacle([]);
      setIsPlaying(false);
      setSpeed(10);
      setScore(0);
      setGameOver(true);
    }
  }

  useEffect(() => {
    eatRabbit();
    updateSpeed(speed);
  }, [snakeHead]);

  useEffect(() => {
    checkCollision();
  }, [snakeHead, addObstacle]);

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
          🐇
        </div>
        {gameover && (
          <div
            className={`text-4xl mb-10 ${pixelFont.className} absolute top-40 text-shadow-lg animate-bounce`}
          >
            GAMEOVER
          </div>
        )}
        {addObstacle.map((item, index) => {
          return (
            <div
              key={index}
              className="w-[30px] h-[30px]  bg-red-400 absolute"
              style={{
                top: item.y,
                left: item.x,
              }}
            ></div>
          );
        })}
        {isPlaying ? (
          <div
            className="w-[20px] h-[20px]  bg-green-400 absolute transition ease-in"
            style={{
              top: `${Math.max(0, Math.min(snakeHead.y, 565))}px`, // går inte utanför containern
              left: `${Math.max(0, Math.min(snakeHead.x, 565))}px`, // går inte utanför containern
            }}
          ></div>
        ) : (
          <button
            onClick={() => {
              setSnakeHead({y: 300, x: 300});
              setIsPlaying(true);
              setGameOver(false);
            }}
            className="bg-green-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all"
          >
            Start Game
          </button>
        )}
      </div>
      <p className={`text-1xl mb-10 ${pixelFont.className}`}>Score: {score}</p>
    </div>
  );
}
