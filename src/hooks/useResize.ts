import { useCallback, useEffect, useState } from "react";

// custom hook to get the width and height of the browser window
const useSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const setSizes = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, [setWidth, setHeight]);

  useEffect(() => {
    window.addEventListener("resize", setSizes);
    setSizes();
    return () => window.removeEventListener("resize", setSizes);
  }, [setSizes]);

  return [width, height];
};

export default useSize;
