“激活”服务端 HTML (Hydration)： 这是 hydrateRoot 最核心的步骤。
React 不会重新创建 DOM 节点，而是会尝试复用容器中已经存在的、由服务端渲染的 HTML 结构。
它会遍历服务端生成的 HTML 和你在客户端提供的 initialChildren (React 元素树)，试图将两者匹配起来。
在这个过程中，它会给现有的 DOM 节点附加事件监听器，使得这些静态的 HTML 变得可交互。
如果客户端的 React 树结构与服务端的 HTML 结构不完全匹配，React 会尝试进行修复，但可能会在控制台给出警告。严重不匹配可能导致 hydration 失败或行为异常。

FiberRootNode 的主要作用：
指向根 Fiber 节点: FiberRoot 的 current 属性始终指向当前渲染在屏幕上的 HostRootFiber（即整个 Fiber 树的根节点）。
管理更新队列: 它包含了所有待处理的更新（pendingLanes），以及与调度相关的优先级信息。
存储工作中的 Fiber 树: 在协调阶段，FiberRoot 会有一个指向正在构建的 workInProgress 树的引用。
错误边界: 它是错误边界捕获错误的起点。
上下文: 存储一些全局上下文信息。
