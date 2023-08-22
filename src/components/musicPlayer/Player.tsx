import { useRef, useState } from "react";
import Visualizer from "../waveform/Visualizer";
import WaveForm from "../waveform/Waveform";

export interface Analazyer {
  analyzer: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
}

const Player = () => {
  const [analyzerData, setAnalyzerData] = useState<Analazyer | null>(null);
  const [audioSrc, setAudioSrc] = useState("");
  const audioElmRef: any = useRef(null);
  const fileInputRef: any = useRef(null);

  const audioAnalyzer = () => {
    //ts-ignore
    const audioCtx = new window.AudioContext();
    // create an analyzer node with a buffer size of 2048
    const analyzer = audioCtx.createAnalyser();
    analyzer.fftSize = 2048;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const source = audioCtx.createMediaElementSource(audioElmRef.current);
    console.log("BUFFER", bufferLength);
    source.connect(analyzer);
    source.connect(audioCtx.destination);

    // set the analyzerData state with the analyzer, bufferLength, and dataArray
    setAnalyzerData({ analyzer, bufferLength, dataArray });
  };

  const onFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioSrc(URL.createObjectURL(file));
    audioAnalyzer();
  };
  return (
    <div>
      {analyzerData && <Visualizer analyzerData={analyzerData} />}
      <div id="audio-controls" style={{ position: "absolute", top: "12px" }}>
        <input
          type="file"
          name="audio"
          ref={fileInputRef}
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        <button
          className="upload-btn"
          onClick={() => {
            if (fileInputRef) fileInputRef.current.click();
          }}
        >
          Choose File
        </button>
        <audio src={audioSrc} controls ref={audioElmRef} />
      </div>
    </div>
  );
};

export default Player;
