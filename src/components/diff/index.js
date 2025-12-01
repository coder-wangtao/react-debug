import React, { useState } from "react";

function App() {
  const [arr, setArr] = useState(["1", "2", "3"]);
  function handleClick() {
    setArr(["2", "3", "1"]);
  }

  return (
    <div>
      <h2 onClick={handleClick}>点我改变数组</h2>
      <ul>
        {arr.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
