import styled from "styled-components";
import Particles from "../background/BGParticles";
import { keyframes } from "styled-components";
import "../../styles/AudioVisualizerWrapper.css";

export default function AudioVisualizer() {
  return (
    <div id={"AudioVisualizerWrapper"}>
      <Particles />
    </div>
  );
}
