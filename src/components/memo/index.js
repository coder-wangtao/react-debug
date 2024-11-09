import * as React from "react";
import { useState } from "react";

// Title 组件使用 React.memo，以避免不必要的重新渲染
const Title = React.memo(() => {
  console.log("Rendering Title component by React.memo");
  return <h1>计数器</h1>;
});

const Title2 = () => {
  console.log("Rendering Title component no React.memo");
  return <h1>计数器</h1>;
};

// Counter 组件不会使用 React.memo
const Counter = ({ count }) => {
  console.log("Rendering Counter component");
  return <p>当前计数：{count}</p>;
};

function App() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };

  const toggle = () => {
    setOtherState(!otherState);
  };

  return (
    <div>
      <Title />
      <Title2 />
      <Counter count={count} />
      <button onClick={increment}>增加计数</button>
      <button onClick={toggle}>切换其他状态</button>
    </div>
  );
}

export default App;
