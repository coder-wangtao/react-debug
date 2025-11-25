Commit Phase 是同步执行的，不能被打断。 这个阶段的主要任务是将 Render Phase 计算出来的变更真实地应用到 DOM 上，并执行相关的生命周期方法（或 Hooks）。

在其内部大体上可以分为四个阶段，React 按顺序执行以下操作:

Before Mutation Effects: 这是在 DOM 突变之前执行的副作用。
DOM Mutations: 这是 React 实际将变更应用到 DOM 的阶段。
Layout Effects: 这是在 DOM 突变完成后，同步执行的副作用。
Passive Effects: 这是 React 用于异步执行副作用的阶段。

前置突变副作用（Before Mutation Effects）
React 允许组件在 DOM 即将被修改之前，从 DOM 中捕获一些信息（例如滚动位置）。这样，在 DOM 更新后，这些信息可以被用来恢复状态或进行其他必要的调整。
所以在实际操作 DOM 之前，执行一些需要读取 DOM 布局或状态的副作用。最典型的例子是 getSnapshotBeforeUpdate 这个生命周期方法（在类组件中）和 useLayoutEffect Hook 中需要读取 DOM 的部分。
在这个阶段中，React 会遍历 effect list（在 Render Phase 构建的，标记了需要进行副作用的 fiber 节点列表）。

DOM 突变（DOM Mutations）
此阶段 React 再次遍历 effect list，执行所有实际的 DOM 操作，如添加、删除、更新节点和属性。对于不同的操作，React 会执行以下步骤：
插入: 对于标记为 Placement 的 fiber，React 会创建新的 DOM 节点并将其插入到父 DOM 节点中的正确位置。
更新: 对于标记为 Update 的 fiber，React 会检查 props 的差异，并更新 DOM 节点的属性、样式、事件监听器等。
删除: 对于标记为 Deletion 的 fiber，React 会将其对应的 DOM 节点从父 DOM 节点中移除。在移除前，会执行其子树中所有组件的 componentWillUnmount 生命周期方法和 useEffect / useLayoutEffect 的清理函数。
Ref 处理: 在这个阶段，ref 回调函数（对于 DOM 节点和类组件）或 useRef 创建的 ref 对象的 .current 属性会被更新，指向相应的 DOM 节点或组件实例。对于 ref 的卸载（当 ref 指向的节点被移除或 ref 函数改变时），清理 ref 的操作也会在 DOM 节点被移除前执行。

布局副作用（Layout Effects）
这些副作用通常用于需要同步读取或修改 DOM 布局的操作。例如，测量元素尺寸、设置焦点、或者同步触发动画。所以在 DOM 突变完成之后，同步执行所有 useLayoutEffect Hook 的回调函数，以及类组件的 componentDidMount 和 componentDidUpdate 生命周期方法。
因为它们是同步执行的，所以可以确保在浏览器下一次绘制之前完成，避免视觉不一致。

副作用（Passive Effects / Effects）
在 Layout Effects 执行完毕后，如果存在 Passive Effects (主要由 useEffect Hook 注册)，React 会异步调度一个任务来执行它们。这个任务会在浏览器绘制之后、主线程空闲时执行，以避免阻塞渲染。

React 会调度一个任务来异步执行 useEffect， 执行上一次 Render 中注册的并且其依赖项已改变的 useEffect 的清理函数。如果组件正在卸载，则执行所有 useEffect 的清理函数。然后，执行本次 Render 中注册的并且其依赖项已改变（或者没有依赖项）的 useEffect 的回调函数。

关于组件卸载时的清理:
当一个组件被卸载时（在 DOM Mutations 阶段被标记为 Deletion）：
首先会执行其类组件子孙的 componentWillUnmount。
然后会执行其自身及子孙的 useLayoutEffect 的清理函数（同步）。
最后，其自身及子孙的 useEffect 的清理函数会被调度执行（异步，在 Passive Effects 阶段）
