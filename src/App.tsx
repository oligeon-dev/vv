import { useEffect, useState } from "react";
import "./App.css";

interface Viewport {
  width: number;
  height: number;
  scale: number;
  pageTop: number;
}

function App() {
  const [viewport, setViewport] = useState<Viewport>({
    width: window.visualViewport?.width || window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight,
    scale: window.visualViewport?.scale || 1,
    pageTop: window.visualViewport?.pageTop || 0,
  });

  useEffect(() => {
    const handleViewportChange = () => {
      if (window.visualViewport) {
        setViewport({
          width: window.visualViewport.width,
          height: window.visualViewport.height,
          scale: window.visualViewport.scale,
          pageTop: window.visualViewport.pageTop,
        });
      }
    };

    window.visualViewport?.addEventListener("resize", handleViewportChange);
    window.visualViewport?.addEventListener("scroll", handleViewportChange);

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

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5>Visual Viewport Info</h5>
      <p>Width: {viewport.width}px</p>
      <p>Height: {viewport.height}px</p>
      <p>Scale: {viewport.scale}</p>
      <input
        type="text"
        className="input"
        onTouchStart={handleTouchStart}
        style={{ fontSize: "1rem" }}
      />
      <div
        className="footer"
        style={{
          position: "fixed",
          bottom: `calc(0px + ${viewport.pageTop}px)`, // キーボード表示分を反映
          left: 0,
          right: 0,
          backgroundColor: "black",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        Footer
      </div>
    </div>
  );
}

export default App;
