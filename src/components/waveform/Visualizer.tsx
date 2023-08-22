/* eslint-disable react/prop-types */
import * as _ from "lodash";
import { Analazyer } from "../musicPlayer/Player";
import { useEffect, useRef } from "react";
import useSize from "../../hooks/useResize";
import "../../styles/Visualizer.css";
interface VisualizerProps {
  analyzerData: Analazyer;
}
const normaliseValues = (min: number = 0, max: number = 0, val: number) => {
  const result = (val - min) / (max - min);
  return result;
};

const getVisualizerSize = (height: number) => {
  if (height > 1200) return 500;
  if (height > 900) return 400;
  return 300;
};

const animateCircle = (
  analyzer: AnalyserNode,
  canvas: any,
  canvasCtx: any,
  dataArray: Uint8Array,
  bufferLength: number,
  height: number = 500
) => {
  analyzer.getByteFrequencyData(dataArray);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.save();

  canvasCtx.scale(0.5, 0.5);
  canvasCtx.translate(window.innerWidth - 100, window.innerHeight);
  canvasCtx.fillStyle = "#ffffff";

  const maxVal = _.max(dataArray);
  const minVal = _.min(dataArray);
  const radiusDiff = dataArray[255] * 0.2;

  const radius = -getVisualizerSize(height) - radiusDiff;

  for (let i = 0; i < bufferLength; i++) {
    const value = normaliseValues(minVal, maxVal, dataArray[i]) * 100;
    const barHeight = -value * (value > 200 ? 10 : 3);

    canvasCtx.fillStyle = "#fffae6";
    canvasCtx.fillRect(0, radius, 3, barHeight);
    canvasCtx.rotate(((180 / 128) * Math.PI) / 180);
  }

  canvasCtx.beginPath();
  canvasCtx.arc(0, 0, -radius, 0, 2 * Math.PI);
  canvasCtx.shadowBlur = 15;
  canvasCtx.shadowColor = "#FFFFFF";
  canvasCtx.strokeStyle = "#fff5cc";
  canvasCtx.lineWidth = 2;
  canvasCtx.stroke();
  canvasCtx.restore();
};

const Visualizer = ({ analyzerData }: VisualizerProps) => {
  const canvasRef = useRef(null);
  const { analyzer, bufferLength, dataArray } = analyzerData;
  const windowSize = useSize();
  const height: number = windowSize[1];

  const draw = (
    dataArray: Uint8Array,
    analyzer: AnalyserNode,
    bufferLength: number,
    height: number
  ) => {
    const canvas: any = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");

    const animatedVisualizer = () => {
      requestAnimationFrame(animatedVisualizer);
      animateCircle(
        analyzer,
        canvas,
        canvasCtx,
        dataArray,
        bufferLength,
        height
      );
    };

    animatedVisualizer();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength, height);
  }, [dataArray, analyzer, bufferLength, height]);

  return (
    <div id="canvas-container">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </div>
  );
};

export default Visualizer;
