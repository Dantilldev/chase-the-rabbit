import { useState, useEffect } from "react";
import { Press_Start_2P } from "next/font/google";
import MusicPlayer from "./components/musicPlayer";
import Link from "next/link";

//  Todos😀
// 1.
// 2.

// 5. Deisgna första sidan: spelinstriktioner, start game, highscore
// 8.  så att kaninen inte kan spawna på ett hinder, samt ändra hastigheten

// 9. Fixa gameover text börjar synas även ifall man ej spelat en omgång

// Pixel fontFixa
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Game() {
  const [snakeHead, setSnakeHead] = useState({ x: 240, y: 240 }); // Postion för Snake
  const [direction, setDirection] = useState("down-direction"); // Riktning för Snake
  const [isPlaying, setIsPlaying] = useState(false); // Om spelet är igång
  const [speed, setSpeed] = useState(10); // Speed för Snake
  const [score, setScore] = useState(0);
  const [rabbitPos, setRabbitPos] = useState({}); // Postion för Rabbit
  const [gameover, setGameOver] = useState(false);
  const [addObstacle, setAddObstacle] = useState([]);
  const [finalScore, setfinalScore] = useState(0);
  const [scoreSound, setScoreSound] = useState(null);
  const [highscore, setHighscore] = useState(0);

  const getEvenRandom = (max) => Math.floor(Math.random() * (max / 2) * 2); // Alltid Jämna tal
  const getOddRandom = (max) => getEvenRandom(max) + 1; // Alltid udda

  function setHighScore() {
    if (localStorage.getItem("highscore") === null) {
      localStorage.setItem("highscore", 0);
    }

    const savedScore = localStorage.getItem("highscore");
    if (score > savedScore) {
      localStorage.setItem("highscore", score);
    }
  }

  useEffect(() => {
    setHighscore(localStorage.getItem("highscore"));
  }, []);

  useEffect(() => {
    setScoreSound(new Audio("/collect-points-190037.mp3")); // Se till så att det bara skrivs
  }, []);

  function playScoreSound() {
    if (scoreSound) {
      scoreSound.currentTime = 0;
      scoreSound.play();
    }
  }

  // Kaninen är alltid jämna tal
  useEffect(() => {
    setRabbitPos({
      x: getEvenRandom(565),
      y: getEvenRandom(565),
    });
  }, []);

  // Funtion som tar hand om riktningen
  function HandleAutoDirection() {
    switch (direction) {
      case "down-direction":
        return setSnakeHead((prev) => ({ ...prev, y: prev.y + speed })); // Gå ner
      case "up-direction":
        return setSnakeHead((prev) => ({ ...prev, y: prev.y - speed })); // Gå upp
      case "right-direction":
        return setSnakeHead((prev) => ({ ...prev, x: prev.x + speed })); // Gå höger
      case "left-direction":
        return setSnakeHead((prev) => ({ ...prev, x: prev.x - speed })); // Gå vänster
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
    if (score >= 0 && score < 4) {
      setSpeed(10);
    } else if (score >= 4 && score <= 8) {
      setSpeed(12);
    } else if (score > 8 && score <= 13) {
      setSpeed(15);
    } else if (score > 13 && score < 35) {
      setSpeed(18);
    } else {
      setSpeed(20);
    }
  }

  // checkar om ormen krockar med Obsatcles
  function checkCollision() {
    if (!isPlaying) return;

    for (let i = 0; i < addObstacle.length; i++) {
      if (
        Math.abs(snakeHead.x - addObstacle[i].x) < 23 &&
        Math.abs(snakeHead.y - addObstacle[i].y) < 23
      ) {
        setSpeed(10);
        setIsPlaying(false);
        setAddObstacle([]);
        setGameOver(true);
        setfinalScore(score);
        setHighScore();
        break;
      }
    }
  }

  function HandleAddObstacle() {
    setAddObstacle([
      ...addObstacle,
      { x: getOddRandom(565), y: getOddRandom(565) },
    ]);
  }

  // Funktion för att äta upp kaninen
  function eatRabbit() {
    if (
      Math.abs(snakeHead.x - rabbitPos.x) < 25 &&
      Math.abs(snakeHead.y - rabbitPos.y) < 25
    ) {
      // generateRabbitPosition();
      setScore((prev) => {
        const newScore = prev + 1;
        return newScore;
      });
      setRabbitPos({
        x: getEvenRandom(565),
        y: getEvenRandom(565),
      });

      playScoreSound();
      HandleAddObstacle();
      checkCollision();
    } else if (
      snakeHead.x > 575 ||
      snakeHead.y > 575 ||
      snakeHead.x < -5 ||
      snakeHead.y < -5
    ) {
      if (isPlaying) {
        setHighScore();
        setfinalScore(score);
        setAddObstacle([]);
        setIsPlaying(false);
        setSpeed(10);
        setGameOver(true);
      }
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
    setSnakeHead({ y: 300, x: 300 });
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setSpeed(10);
    setAddObstacle([]);
  }

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-imageV2.jpg')" }}
    >
      <h1 className={`text-4xl mb-12 ${pixelFont.className} text-white`}>
        Snake Game
      </h1>

      <div className="flex justify-center items-center w-[600px] h-[600px] relative border-8 border-white">
        <div className="absolute top-[-30px] left-[-8px]">
          <p className={`text-1xl ${pixelFont.className} text-white`}>
            Score: {score}
          </p>{" "}
        </div>
        <div className="absolute top-[50px] right-[-20px]">
          <span className="absolute top-0">
            <MusicPlayer />
          </span>
        </div>
        <div className="absolute top-[-30px] right-[-8px]">
          <p className={`${pixelFont.className} text-white`}>
            {" "}
            highscore: {highscore}{" "}
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
              className={`w-[25px] h-[25px] bg-orange-400 absolute  `}
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
          >
            <div className="bg-red-500 w-[2px] h-[6px] bottom-0 left-0 absolute"></div>
            <div className="bg-red-500 w-[2px] h-[6px] top-0 left-0 absolute"></div>

            {/* Mouth */}
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
        ) : (
          <div className="flex flex-row gap-6 mt-10">
            <button
              onClick={restartGame}
              className="bg-green-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all"
            >
              Start Game
            </button>
            <Link href="/">
              <button className="bg-blue-500 rounded-xl text-center p-2 text-white font-bold cursor-pointer hover:scale-120 duration-150 ease-in transition-all">
                Back Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
