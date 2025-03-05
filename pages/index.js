import {useState, useEffect} from "react";
import {Press_Start_2P} from "next/font/google";

//  Todos😀
// 1.
// 2.
// 3. Bakgrundmuisk med mute knapp
// 4. Ljud effekt för varje gång den käkar en kanin(poäng), gameover,start game,
// 5. Deisgna första sidan: spelinstriktioner, start game, highscore
// 6. Localstorage med highscore function
// 7. Fixa score så att det syns hur mycket man fått
// 8. Fixa så att kaninen inte kan spawna på ett hinder samt ändra hastigheten

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
  const [finalScore, setfinalScore] = useState(0);

  useEffect(() => {
    setRabbitPos({
      x: Math.floor(Math.random() * 565),
      y: Math.floor(Math.random() * 565),
    });
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

  // Uppdaterar hastigheten
  function updateSpeed() {
    if (score >= 8 && score <= 12) {
      setSpeed(12);
    } else if (score > 12 && score <= 17) {
      setSpeed(15);
    } else if (score > 17 && score < 35) {
      setSpeed(18);
    }
  }

  // Kollar om den nya positionen är säker
  // Används för att kolla ifall den kolliderar
  function generateRabbitPosition() {
    let newPos;
    let safe = false;

    while (!safe) {
      newPos = {
        x: Math.floor(Math.random() * 565),
        y: Math.floor(Math.random() * 565),
      };

      // Check if the new position is inside an obstacle

      safe = !addObstacle.some(
        (obstacle) =>
          Math.abs(newPos.x - obstacle.x) < 20 &&
          Math.abs(newPos.y - obstacle.y) < 20
      );
    }

    setRabbitPos(newPos);
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

  function HandleAddObstacle() {
    setAddObstacle([
      ...addObstacle,
      {x: Math.random() * 530, y: Math.random() * 530},
    ]);
  }

  // Funktion för att äta upp kaninen
  function eatRabbit() {
    if (
      Math.abs(snakeHead.x - rabbitPos.x) < 25 &&
      Math.abs(snakeHead.y - rabbitPos.y) < 25
    ) {
      generateRabbitPosition();
      setScore((prev) => {
        const newScore = prev + 1;
        console.log("SCORE update", newScore);
        return newScore;
      });
      HandleAddObstacle();
      checkCollision();
    } else if (
      snakeHead.x > 575 ||
      snakeHead.y > 575 ||
      snakeHead.x < -5 ||
      snakeHead.y < -5
    ) {
      setfinalScore(score);
      setAddObstacle([]);
      setIsPlaying(false);
      setSpeed(10);
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

  function changeDireaction() {
    if (direction === "down-direction") {
      return "rotate-[-90deg]";
    } else if (direction === "up-direction") {
      return "rotate-[90deg]";
    } else if (direction === "right-direction") {
      return "rotate-[180deg]";
    } else if (direction === "left-direction") {
      return "rotate-[0]";
    }
  }

  function restartGame() {
    setSnakeHead({y: 300, x: 300});
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setSpeed(10);
    setAddObstacle([]);
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center"
      style={{backgroundImage: "url('/bg-image.jpg')"}}
    >
      <h1 className={`text-4xl mb-12 ${pixelFont.className} text-white`}>
        Snake Game
      </h1>

      <div className="flex justify-center items-center w-[600px] h-[600px] relative border-8 border-white">
        <div className="absolute top-[-30px] left-0">
          <p className={`text-1xl ${pixelFont.className} text-white`}>
            Score: {score}
          </p>
        </div>

        <div
          className="absolute text-xl text-center rotate-[0]"
          style={{
            top: rabbitPos.y, // säkerställ att den är inom containern
            left: rabbitPos.x, // säkerställ att den är inom containern
          }}
        >
          🐇
        </div>
        {gameover && (
          <div className="absolute top-40 text-shadow-lg text-white text-center">
            <h1
              className={`text-4xl mb-10 ${pixelFont.className}  text-shadow-lg animate-bounce text-white`}
            >
              GAMEOVER
            </h1>
            <p className={`${pixelFont.className} font-bold `}>
              You scored: {finalScore}
            </p>
          </div>
        )}
        {addObstacle.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-[30px] h-[30px] bg-orange-400 absolute  `}
              style={{
                top: item.y,
                left: item.x,
              }}
            ></div>
          );
        })}
        {isPlaying ? (
          <div
            className={`w-[20px] h-[20px] bg-green-400 absolute ${changeDireaction()} transition-all ease-out duration-150`}
            style={{
              top: `${Math.max(0, Math.min(snakeHead.y, 565))}px`, // går inte utanför containern
              left: `${Math.max(0, Math.min(snakeHead.x, 565))}px`, // går inte utanför containern
            }}
          ></div>
        ) : (
          <button
            onClick={restartGame}
            className="bg-green-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all"
          >
            Start Game
          </button>
        )}
      </div>
    </div>
  );
}
