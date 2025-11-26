import { useEffect, useState, useRef } from "react";

function App() {
  const [showButton, setShowButton] = useState(true);

  return (
    <div>
      <button
        onClick={() => {
          setShowButton(!showButton);
        }}
      >
        显示按钮
      </button>
      {showButton && <button>点击我</button>}
    </div>
  );
}

export default App;
