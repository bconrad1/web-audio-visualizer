import { useRef, useState } from "react";
import Visualizer from "../waveform/Visualizer";
import "../../styles/Player.css";
import { AudioControls } from "./AudioControls";
import { FaFileUpload } from "react-icons/fa";
export interface Analazyer {
  analyzer: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
}

const Player = () => {
  const [analyzerData, setAnalyzerData] = useState<Analazyer | null>(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
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
    <div id="player-ctn">
      {analyzerData && <Visualizer analyzerData={analyzerData} />}

      <div id="input-ctn">
        {!audioSrc ? (
          <button
            onClick={() => {
              if (fileInputRef) fileInputRef.current.click();
            }}
            id={"file-upload-btn"}
          >
            Choose File <FaFileUpload style={{ marginLeft: "4px" }} />
          </button>
        ) : (
          <button
            onClick={() => {
              if (fileInputRef) fileInputRef.current.click();
            }}
            id={"file-upload-btn-min"}
          >
            <FaFileUpload style={{ marginLeft: "4px" }} />
          </button>
        )}
        <div>
          <input
            type="file"
            name="audio"
            accept=".mp3,audio/*"
            ref={fileInputRef}
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          <audio src={audioSrc} ref={audioElmRef} />
          {!!audioSrc && (
            <AudioControls audioRef={audioElmRef} disable={!audioSrc} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
