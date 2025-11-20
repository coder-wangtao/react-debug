/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;
//TODO:Fiber中的tag
export const FunctionComponent = 0; // 代表一个函数组件。在 beginWork 中会直接调用该函数获取其子元素。
export const ClassComponent = 1; // 代表一个类组件。在 beginWork 中会实例化组件 (如果需要)，调用生命周期方法 (如 render) 获取子元素。
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node. // HostRoot Fiber
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer. <Portal/>
export const HostComponent = 5; //  代表一个原生的 DOM 元素 (如 <div>, <span>, <p> 等)。beginWork 会处理其 children，completeWork 负责创建或更新真实的 DOM 节点。
export const HostText = 6; // 代表一个文本节点 (DOM 中的 TextNode)。它没有子节点。
export const Fragment = 7; //<Fragment /> 它本身不渲染到 DOM，只是用来包裹一组子元素。
export const Mode = 8; //<React.StrictMode> / <React.ConcurrentMode>
export const ContextConsumer = 9; // <Context.Consumer /> || useContext
export const ContextProvider = 10; //<Context.Provider/>
export const ForwardRef = 11; //<React.forward/>
export const Profiler = 12; //<React.Profiler/>: 用于性能分析
export const SuspenseComponent = 13; // <React.Suspense>
export const MemoComponent = 14; //<React.memo/> 代表通过 React.memo 优化的组件。beginWork 会进行 props 的浅比较来决定是否跳过渲染。
export const SimpleMemoComponent = 15; // MemoComponent 的一种特定形式，当比较函数简单时使用。
export const LazyComponent = 16; // React.lazy()创建的动态加载组件。beginWork 会处理其加载状态。
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
//都是实验性
export const ScopeComponent = 21; // 一个实验性的特性，用于创建隔离的事件作用域。
export const OffscreenComponent = 22; // <React.Offscreen>用于控制组件的可见性和渲染行为，例如在屏幕外预渲染或保持状态隐藏。
export const LegacyHiddenComponent = 23; // 旧版的隐藏组件，类似 OffscreenComponent 但行为有所不同。旧版的隐藏组件，类似 OffscreenComponent 但行为有所不同。
export const CacheComponent = 24; // React Cache 相关，用于缓存数据获取结果。
export const TracingMarkerComponent = 25; // 与 React 的内部追踪和 DevTools 相关。
export const HostHoistable = 26; // 与静态提升优化相关，可能用于标记那些可以在构建时提升的静态子树或元素。
export const HostSingleton = 27;
export const IncompleteFunctionComponent = 28;
export const Throw = 29;
export const ViewTransitionComponent = 30;
export const ActivityComponent = 31;
