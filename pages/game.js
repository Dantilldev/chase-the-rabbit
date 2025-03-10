import Link from "next/link";
import {Press_Start_2P} from "next/font/google";
import MusicPlayer from "./components/MusicPlayer";
import {useState, useEffect, useContext} from "react";
import Button from "./components/Button";
import CoinContext from "./context/CoinContext";
import {ImCoinDollar} from "react-icons/im";
import CharacterContext from "./context/CharatcerContext";
import Character2 from "./components/Character2";
import Character1 from "./components/Charater1";
import Character3 from "./components/Character3";

//  Todos :)
// 1. Att man ser om vilka karatärer man har köpt
// 2. köpa och byta charactär
// 3. Fixa props för karaktärs sidan

// Pixel fontFixa
const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Game() {
  const [snakeHead, setSnakeHead] = useState({x: 240, y: 240}); // Postion för Snake
  const [direction, setDirection] = useState("down-direction"); // Riktning för Snake
  const [isPlaying, setIsPlaying] = useState(false); // Om spelet är igång
  const [speed, setSpeed] = useState(10); // Speed för Snake
  const [score, setScore] = useState(0);
  const [rabbitPos, setRabbitPos] = useState({}); // Postion för Rabbit
  const [gameover, setGameOver] = useState(false);
  const [addObstacle, setAddObstacle] = useState([]);
  const [finalScore, setfinalScore] = useState(0);
  const [scoreSound, setScoreSound] = useState(null);
  const [gameOverSound, setGameOverSound] = useState(null);
  const [highscore, setHighcore] = useState();

  // f
  const {coins, setCoins} = useContext(CoinContext);
  const {character, setCharacter} = useContext(CharacterContext);

  const getEvenRandom = (max) => Math.floor(Math.random() * (max / 2) * 2); // Alltid Jämna tal
  const getOddRandom = (max) => getEvenRandom(max) + 1; // Alltid udda

  // USEEFFECT
  useEffect(() => {
    setScoreSound(new Audio("/collect-points-190037.mp3")); // Se till så att det bara skrivs
    setGameOverSound(new Audio("/game-over-arcade-6435.mp3")); // Se till så att det bara skrivs
  }, []);

  useEffect(() => {
    eatRabbit();
    updateSpeed(speed);
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

  useEffect(() => {
    const savedHighscore = Number(localStorage.getItem("highscore")) || 0;
    setHighcore(savedHighscore);
    // Uppdatera highscore när spelet är över
    if (gameover) {
      if (score > highscore) {
        localStorage.setItem("highscore", score); // Uppdaterar highscore i localStorage
        setHighcore(score); // Uppdaterar state för highscore
      }
      // För UPPDATERING AV COINS VARJE GÅNG MAN DÖR
      getCoins();
    }
  }, [gameover, score, highscore]); // Lyssnar på förändringar i score och gameover

  // Spara coins i localstorage och uppdatera coins
  function getCoins() {
    let currentCoins = Number(localStorage.getItem("coins"));
    console.log("Current coins: ", currentCoins);
    let coinsFromGame = score;

    // let newCoins = currentCoins + coinsFromGame;
    localStorage.setItem("coins", currentCoins + coinsFromGame);
    setCoins(Number(localStorage.getItem("coins")));
  }

  function savedHighscore() {
    if (localStorage.getItem("highscore") === null) {
      localStorage.setItem("highscore", 0);
    }

    const savedScore = localStorage.getItem("highscore");
    if (score > savedScore) {
      localStorage.setItem("highscore", score);
    }
  }

  function playScoreSound() {
    if (scoreSound) {
      scoreSound.currentTime = 0;
      scoreSound.play();
    }
  }

  function playGameOverSound() {
    if (gameOverSound) {
      gameOverSound.currentTime = 0;
      gameOverSound.play();
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
        playGameOverSound();
        setfinalScore(score);
        setSpeed(10);
        setIsPlaying(false);
        setAddObstacle([]);
        setGameOver(true);
        savedHighscore();
        break;
      }
    }
  }

  function HandleAddObstacle() {
    setAddObstacle([
      ...addObstacle,
      {x: getOddRandom(565), y: getOddRandom(565)},
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
        playGameOverSound();
        setfinalScore(score);
        savedHighscore();
        setAddObstacle([]);
        setIsPlaying(false);
        setSpeed(10);
        setGameOver(true);
      }
    }
  }

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

  // Restart Game
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
      className="flex flex-col justify-center items-center min-h-screen w-full bg-cover bg-center bg-slate-800"
      // style={{ backgroundImage: "url('/bg-imageV2.jpg')" }}
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
            highscore: {highscore}
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
              className={`w-[25px] h-[25px] bg-orange-500 text-4xl absolute `}
              style={{
                top: item.y,
                left: item.x,
              }}
            ></div>
          );
        })}
        {isPlaying ? (
          <div>
            {character === "character-1" ? (
              <Character1
                changeDirection={changeDireaction()}
                snakeHead={snakeHead}
              />
            ) : character === "character-2" ? (
              <Character2
                changeDirection={changeDireaction()}
                snakeHead={snakeHead}
              />
            ) : character === "character-3" ? (
              <Character3
                changeDirection={changeDireaction()}
                snakeHead={snakeHead}
              />
            ) : (
              console.log("didnt work")
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-6 mt-10">
            <Button href="#" text="Start Game" onClick={restartGame} />
            <Button href="/" text="Back Home" />
          </div>
        )}
      </div>
    </div>
  );
}
