import { useEffect, useRef } from "react";

function animateBars(
  analyser: any,
  canvas: any,
  canvasCtx: any,
  dataArray: any,
  bufferLength: any
) {
  // Analyze the audio data using the Web Audio API's `getByteFrequencyData` method.

  // Set the canvas fill style to black.
  canvasCtx.fillStyle = "#000";

  // Calculate the height of the canvas.
  const HEIGHT = canvas.height / 2;

  // Calculate the width of each bar in the waveform based on the canvas width and the buffer length.
  var barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;

  // Initialize variables for the bar height and x-position.
  let barHeight;
  let x = 0;

  // Loop through each element in the `dataArray`.
  for (var i = 0; i < bufferLength; i++) {
    // Calculate the height of the current bar based on the audio data and the canvas height.
    barHeight = (dataArray[i] / 255) * HEIGHT;

    // Generate random RGB values for each bar.
    const maximum = 10;
    const minimum = -10;
    var r = 242 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var g = 104 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var b = 65 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    // Set the canvas fill style to the random RGB values.
    canvasCtx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

    // Draw the bar on the canvas at the current x-position and with the calculated height and width.
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    // Update the x-position for the next bar.
    x += barWidth + 1;
  }
}

// Component to render the waveform
const WaveForm = ({ analyzerData }: any) => {
  // Ref for the canvas element
  const canvasRef = useRef(null);
  const { dataArray, analyzer, bufferLength } = analyzerData;

  // Function to draw the waveform
  const draw = (dataArray: any, analyzer: any, bufferLength: any) => {
    const canvas: any = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    const animate = () => {
      requestAnimationFrame(animate);
      animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
    };

    animate();
  };

  // Effect to draw the waveform on mount and update
  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
  }, [dataArray, analyzer, bufferLength]);

  // Return the canvas element
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default WaveForm;
