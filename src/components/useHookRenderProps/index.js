import React, { Component } from "react";
import useCounter from "./useCounter";

// render prop 容器组件，使用 useCounter Hook
function CounterContainer({ render }) {
  const counter = useCounter();
  return render(counter);
}

// 类组件
class CounterClass extends Component {
  render() {
    const { count, increment, decrement } = this.props;
    return (
      <div>
        <h1>UseHookRenderPropsApp Count: {count}</h1>
        <button onClick={increment}>增加</button>
        <button onClick={decrement}>减少</button>
      </div>
    );
  }
}

// 使用 CounterContainer 包装类组件
export default function App() {
  return (
    <CounterContainer render={(counter) => <CounterClass {...counter} />} />
  );
}
