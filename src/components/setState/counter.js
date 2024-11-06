import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    // 初始化状态
    this.state = {
      count: 0,
    };
  }

  // 使用 setState 更新状态
  incrementWithSetState = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  // 直接修改 this.state（不推荐）
  incrementDirectly = () => {
    this.state.count += 1; // 直接修改状态
    console.log("Current count:", this.state.count);
    this.forceUpdate();
    // 这里不会触发重新渲染
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps", nextProps, nextState, this.state);
    return true;
  }

  render() {
    return (
      <div>
        <h1>计数器</h1>
        <p>使用 setState 增加计数: {this.state.count}</p>
        <button onClick={this.incrementWithSetState}>
          增加计数 (setState)
        </button>

        <p>直接修改状态 (无渲染): {this.state.count}</p>
        <button onClick={this.incrementDirectly}>增加计数 (直接修改)</button>
      </div>
    );
  }
}

export default Counter;
