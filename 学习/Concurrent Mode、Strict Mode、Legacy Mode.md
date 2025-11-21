Concurrent Mode（并发模式）
React 18 引入了新的渲染架构“并发渲染（Concurrent Rendering）”。
它让 React 能够 中断渲染、优先处理更紧急的更新、后台渲染、延迟过期任务。
Concurrent Mode 不再像 React 16-17 一样需要 <ConcurrentMode> 标签
React 18 中只要使用如下 API，就自动启用 concurrent features：
createRoot()（React 18 默认）
useTransition
useDeferredValue
Suspense（在更多场景支持）
服务器组件（部分）

Strict Mode（严格模式）
开发模式下的检查工具，不影响生产环境！
Strict Mode 不是 “Concurrent Mode”
虽然它会模拟一些并发场景以帮助你发现问题，但严格模式本身不会开启并发渲染。

Legacy Mode（旧模式）
React 17 及以前的旧渲染方式
React 18 仍然保留用于兼容，但不推荐使用。
ReactDOM.render(<App />, document.getElementById('root'));
