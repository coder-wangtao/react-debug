// 事件优先级
// DiscreteEventPriority（离散事件优先级）
// 定义：离散事件是指用户的明确、独立的操作行为，这类事件通常期望得到立即的视觉反馈。

// 典型事件类型：
// click - 点击操作
// keydown / keyup - 键盘按键
// focus / blur - 焦点变化
// submit - 表单提交
// touchstart / touchend - 触摸开始/结束
// 优先级特征：

// 最高优先级：通常映射到 SyncLane，同步执行
// 不可中断：一旦开始处理，会立即完成
// 即时反馈：确保用户操作得到立即响应

function Button() {
  const [count, setCount] = useState(0);

  // 点击事件属于 DiscreteEventPriority
  // 会被分配 SyncLane，立即执行
  const handleClick = () => {
    setCount(count + 1); // 立即更新，用户立即看到反馈
  };

  return <button onClick={handleClick}>Count: {count}</button>;
}
