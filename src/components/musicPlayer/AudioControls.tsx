import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import "../../styles/AudioPlayer.css";

interface AudioControlsProps {
  audioRef: any;
  disable: boolean;
}

export const AudioControls = ({ audioRef, disable }: AudioControlsProps) => {
  const handlePlayPauseClick = () => {
    isPaused ? audioRef.current.play() : audioRef.current.pause();
    setPlayPause(!isPaused);
  };

  const [isPaused, setPlayPause] = useState<boolean>(true);
  return (
    <div id="audio-player-ctn">
      <button onClick={handlePlayPauseClick} disabled={disable}>
        {isPaused ? (
          <FaPlay className="audio-svg" />
        ) : (
          <FaPause className="audio-svg" />
        )}
      </button>
    </div>
  );
};
