import { useEffect, useRef } from "react";

type PlaybackOptions = {
  volume?: number;
};

const useAudio = (src: any, { volume = 1 }: PlaybackOptions) => {
  const sound = useRef(new Audio(src));

  useEffect(() => {
    sound.current.volume = volume;
  }, [volume]);

  return sound.current;
};

export default useAudio;
