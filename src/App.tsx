import { useEffect, useState } from "react";
import "./App.css";

// interface Viewport {
//   width: number;
//   height: number;
//   scale: number;
// }

function App() {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h5>Viewport Info</h5>
      <p>Height: {viewportHeight}px</p>
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
          bottom: `calc(0px + ${window.innerHeight - viewportHeight}px)`, // キーボード分の高さ調整
          left: 0,
          right: 0,
          backgroundColor: "lightgrey",
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
