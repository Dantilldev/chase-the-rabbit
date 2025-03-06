import { useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Referens till audio
  const audioRef = useRef(null);

  function volume() {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
    }
  }

  // Togglar play/pause
  function togglePlay() {
    if (audioRef.current) {
      volume();

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <div>
      <audio ref={audioRef} src="/bg-music.mp3" loop />
      <button
        onClick={togglePlay}
        className="text-3xl  text-white cursor-pointer"
      >
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </div>
  );
}

// anänder useRef istället för useState för att referera till audio. För att inte behöva rendera om komponenten varje gång vi klickar på on/off kanppen.
