import Particles from "./background/BGParticles";
import "../styles/AudioVisualizerWrapper.css";
import Player from "./musicPlayer/Player";

export default function AudioVisualizer() {
  return (
    <div id={"AudioVisualizerWrapper"}>
      <Player />
      <Particles />
    </div>
  );
}
