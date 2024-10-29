import { useEffect, useState } from "react";

import "./App.css";

interface Viewport {
  width: number;
  height: number;
  scale: number;
}

function App() {
  const [viewport, setViewport] = useState<Viewport>({
    width: window.visualViewport?.width || window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight,
    scale: window.visualViewport?.scale || 1,
  });

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        setViewport({
          width: window.visualViewport.width,
          height: window.visualViewport.height,
          scale: window.visualViewport.scale,
        });
      }
    };

    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("scroll", handleViewportChange);

    // Cleanup event listeners on component unmount
    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        handleViewportChange
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        handleViewportChange
      );
    };
  }, []);

  return (
    <div>
      <h1>Visual Viewport Info</h1>
      <p>Width: {viewport.width}px</p>
      <p>Height: {viewport.height}px</p>
      <p>Scale: {viewport.scale}</p>
      <input type="text" className="input" style={{ fontSize: "1rem" }} />
    </div>
  );
}

export default App;
