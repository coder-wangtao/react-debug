import React, { useEffect, useState } from "react";
import store from "./store";

// 创建组件
const Counter = () => {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().count);
    });

    return () => unsubscribe();
  }, []);

  const increment = () => store.dispatch({ type: "INCREMENT" });
  const decrement = () => store.dispatch({ type: "DECREMENT" });

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
