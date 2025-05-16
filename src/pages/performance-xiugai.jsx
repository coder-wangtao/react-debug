// react 性能优化的一般策略
// 将变化的部分与不变的部分分离
// 什么是变化的部分？
// State Props Context
// 命中性能优化的组件可以不用 reconcile 生成 wip.child,而是直接复用上次更新生成的 wip.child
// 总结起来有两点 1.新歌优化的思路是将变化的部分与不变的部分分离 2.命中性能优化的组件的子组件(而不是它本身)不需要要 render
// 例子在 react-debug 这个项目

import { useState } from "react";

function Performance() {
  console.log("App render");
  return (
    <div>
      <Num />
      <ExpensiveSubTree />
    </div>
  );
}

export default Performance;

function Num() {
  const [num, update] = useState(0);
  return (
    <>
      <button onClick={() => update(num + 1)}>+1</button>
      <p>num is: {num}</p>
    </>
  );
}

function ExpensiveSubTree() {
  console.log("Expensive Render");
  return <p>i am a child</p>;
}
