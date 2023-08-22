import React from "react";
import ReactDOM from "react-dom/client";
import AudioVisualizer from "./components/AudioVisualizer";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<AudioVisualizer />);
