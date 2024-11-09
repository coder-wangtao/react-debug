import React, { Component } from "react";
import useCounter from "./useCounter";

// 高阶组件，封装 useCounter Hook 的逻辑
function withCounter(Component) {
  return function WrappedComponent(props) {
    const counter = useCounter();
    return <Component {...props} counter={counter} />;
  };
}

// 类组件
class CounterClass extends Component {
  render() {
    const { count, increment, decrement } = this.props.counter;
    return (
      <div>
        <h1>Hoc Count: {count}</h1>
        <button onClick={increment}>增加</button>
        <button onClick={decrement}>减少</button>
      </div>
    );
  }
}

// 使用高阶组件包装类组件
export default withCounter(CounterClass);
