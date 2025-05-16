// import { useEffect, useState, useRef } from "react";

// function App() {
//   const [showButton, setShowButton] = useState(true);
//   const buttonRef = useRef();
//   useEffect(() => {
//     if (buttonRef.current) {
//       const handler = () => console.log("按钮被点击了");
//       buttonRef.current.addEventListener("click", handler);
//       return () => {
//         console.log("清理事件监听器");
//         buttonRef.current?.removeEventListener("click", handler);
//       };
//     }
//   }, [showButton]);

//   return (
//     <div>
//       <button onClick={() => setShowButton(!showButton)}>显示按钮</button>
//       {showButton && <button ref={buttonRef}>点击我</button>}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState, useRef } from "react";

function App() {
  const [showButton, setShowButton] = useState(true);

  const setRef = (ref) => {
    if (ref) {
      const handler = () => console.log("按钮被点击了");
      ref.addEventListener("click", handler);
      return () => {
        console.log("清理事件监听器");
        ref.removeEventListener("click", handler);
      };
    }
  };

  return (
    <div>
      <button onClick={() => setShowButton(!showButton)}>显示按钮</button>
      {showButton && <button ref={setRef}>点击我</button>}
    </div>
  );
}

export default App;
