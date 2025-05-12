import { useState, useEffect } from "react";
import ReactDemo from "react-dom";

function effect1() {
  console.log("uesEffect回调111执行");
  return () => {
    console.log("effect 111 销毁");
  };
}
function effect2() {
  console.log("uesEffect回调222执行");
  return () => {
    console.log("effect 222 销毁");
  };
}

function effect3() {
  console.log("uesEffect回调333执行");
  return () => {
    console.log("effect 333 销毁");
  };
}

function effect4() {
  console.log("uesEffect回调444执行");
  return () => {
    console.log("effect 444 销毁");
  };
}

function Bpp() {
  useEffect(effect3, []);
  useEffect(effect4, []);
  return <h1>Bpp</h1>;
}

export default function Effect() {
  const [count, setCount] = useState(0);

  useEffect(effect1, []);
  useEffect(effect2, []);

  function handle_click() {
    setCount((count) => {
      return count + 1;
    });
  }
  return (
    <div>
      <h1 onClick={handle_click}>点我新增{count}</h1>
      {count === 1 ? <Bpp /> : null}
    </div>
  );
}
