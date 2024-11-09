import React, { useState, useMemo } from "react";

const ExpensiveCalculationComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  // 模拟一个较耗时的计算函数
  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    let total = 0;
    for (let i = 0; i < 100000000; i++) {
      total += i * num;
    }
    return total;
  };

  // 仅在 inputValue 改变时重新计算
  const calculatedValue = useMemo(
    () => expensiveCalculation(inputValue),
    [inputValue]
  );

  return (
    <div>
      <h2>useMemo 示例</h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
        placeholder="输入一个数字"
      />
      <button onClick={() => setCount(count + 1)}>点击次数: {count}</button>
      <p>计算结果: {calculatedValue}</p>
    </div>
  );
};

export default ExpensiveCalculationComponent;
