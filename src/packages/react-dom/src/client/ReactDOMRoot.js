/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ReactNodeList, ReactFormState } from "shared/ReactTypes";
import type {
  FiberRoot,
  TransitionTracingCallbacks,
} from "react-reconciler/src/ReactInternalTypes";

import { isValidContainer } from "react-dom-bindings/src/client/ReactDOMContainer";
import { queueExplicitHydrationTarget } from "react-dom-bindings/src/events/ReactDOMEventReplaying";
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import {
  disableCommentsAsDOMContainers,
  enableDefaultTransitionIndicator,
} from "shared/ReactFeatureFlags";

export type RootType = {
  render(children: ReactNodeList): void,
  unmount(): void,
  _internalRoot: FiberRoot | null,
};

export type CreateRootOptions = {
  unstable_strictMode?: boolean,
  unstable_transitionCallbacks?: TransitionTracingCallbacks,
  identifierPrefix?: string,
  onUncaughtError?: (
    error: mixed,
    errorInfo: { +componentStack?: ?string }
  ) => void,
  onCaughtError?: (
    error: mixed,
    errorInfo: {
      +componentStack?: ?string,
      +errorBoundary?: ?any,
    }
  ) => void,
  onRecoverableError?: (
    error: mixed,
    errorInfo: { +componentStack?: ?string }
  ) => void,
  onDefaultTransitionIndicator?: () => void | (() => void),
};

export type HydrateRootOptions = {
  // Hydration options
  onHydrated?: (hydrationBoundary: Comment) => void,
  onDeleted?: (hydrationBoundary: Comment) => void,
  // Options for all roots
  unstable_strictMode?: boolean,
  unstable_transitionCallbacks?: TransitionTracingCallbacks,
  identifierPrefix?: string,
  onUncaughtError?: (
    error: mixed,
    errorInfo: { +componentStack?: ?string }
  ) => void,
  onCaughtError?: (
    error: mixed,
    errorInfo: {
      +componentStack?: ?string,
      +errorBoundary?: ?any,
    }
  ) => void,
  onRecoverableError?: (
    error: mixed,
    errorInfo: { +componentStack?: ?string }
  ) => void,
  onDefaultTransitionIndicator?: () => void | (() => void),
  formState?: ReactFormState<any, any> | null,
};

import {
  isContainerMarkedAsRoot,
  markContainerAsRoot,
  unmarkContainerAsRoot,
} from "react-dom-bindings/src/client/ReactDOMComponentTree";
import { listenToAllSupportedEvents } from "react-dom-bindings/src/events/DOMPluginEventSystem";
import { COMMENT_NODE } from "react-dom-bindings/src/client/HTMLNodeType";

import {
  createContainer,
  createHydrationContainer,
  updateContainer,
  updateContainerSync,
  flushSyncWork,
  isAlreadyRendering,
  defaultOnUncaughtError,
  defaultOnCaughtError,
  defaultOnRecoverableError,
} from "react-reconciler/src/ReactFiberReconciler";
import { defaultOnDefaultTransitionIndicator } from "./ReactDOMDefaultTransitionIndicator";
import { ConcurrentRoot } from "react-reconciler/src/ReactRootTags";

// $FlowFixMe[missing-this-annot]
function ReactDOMRoot(internalRoot: FiberRoot) {
  this._internalRoot = internalRoot;
}

// $FlowFixMe[prop-missing] found when upgrading Flow
ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render =
  // $FlowFixMe[missing-this-annot]
  function (children: ReactNodeList): void {
    const root = this._internalRoot;
    if (root === null) {
      throw new Error("Cannot update an unmounted root.");
    }

    if (__DEV__) {
      // using a reference to `arguments` bails out of GCC optimizations which affect function arity
      const args = arguments;
      if (typeof args[1] === "function") {
        console.error(
          "does not support the second callback argument. " +
            "To execute a side effect after rendering, declare it in a component body with useEffect()."
        );
      } else if (isValidContainer(args[1])) {
        console.error(
          "You passed a container to the second argument of root.render(...). " +
            "You don't need to pass it again since you already passed it to create the root."
        );
      } else if (typeof args[1] !== "undefined") {
        console.error(
          "You passed a second argument to root.render(...) but it only accepts " +
            "one argument."
        );
      }
    }
    updateContainer(children, root, null, null);
  };

// $FlowFixMe[prop-missing] found when upgrading Flow
ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount =
  // $FlowFixMe[missing-this-annot]
  function (): void {
    if (__DEV__) {
      // using a reference to `arguments` bails out of GCC optimizations which affect function arity
      const args = arguments;
      if (typeof args[0] === "function") {
        console.error(
          "does not support a callback argument. " +
            "To execute a side effect after rendering, declare it in a component body with useEffect()."
        );
      }
    }
    const root = this._internalRoot;
    if (root !== null) {
      this._internalRoot = null;
      const container = root.containerInfo;
      if (__DEV__) {
        if (isAlreadyRendering()) {
          console.error(
            "Attempted to synchronously unmount a root while React was already " +
              "rendering. React cannot finish unmounting the root until the " +
              "current render has completed, which may lead to a race condition."
          );
        }
      }

      // 其会通知Reconciler，让Reconciler从根节点开始，自顶向下遍历整个 Fiber 树：
      // 对于每个组件，会执行其卸载相关的生命周期方法（例如，类组件的 componentWillUnmount ，函数组件中 useEffect 的清理函数）。
      // 移除所有关联的 DOM 节点。
      // 清理事件监听器等资源。
      // 1.同步地更新容器内容为 null，这将触发组件的卸载生命周期
      updateContainerSync(null, root, null, null);
      // 2. 确保所有同步工作完成
      flushSyncWork();
      // 3. 从 DOM 容器上移除 React 根标记
      unmarkContainerAsRoot(container);
    }
  };

export function createRoot(
  container: Element | Document | DocumentFragment,
  options?: CreateRootOptions
): RootType {
  if (!isValidContainer(container)) {
    throw new Error("Target container is not a DOM element.");
  }

  warnIfReactDOMContainerInDEV(container);

  const concurrentUpdatesByDefaultOverride = false;
  let isStrictMode = false;
  let identifierPrefix = "";
  let onUncaughtError = defaultOnUncaughtError;
  let onCaughtError = defaultOnCaughtError;
  let onRecoverableError = defaultOnRecoverableError;
  let onDefaultTransitionIndicator = defaultOnDefaultTransitionIndicator;
  let transitionCallbacks = null;

  if (options !== null && options !== undefined) {
    if (__DEV__) {
      if ((options: any).hydrate) {
        console.warn(
          "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
        );
      } else {
        if (
          typeof options === "object" &&
          options !== null &&
          (options: any).$$typeof === REACT_ELEMENT_TYPE
        ) {
          console.error(
            "You passed a JSX element to createRoot. You probably meant to " +
              "call root.render instead. " +
              "Example usage:\n\n" +
              "  let root = createRoot(domContainer);\n" +
              "  root.render(<App />);"
          );
        }
      }
    }
    if (options.unstable_strictMode === true) {
      isStrictMode = true;
    }
    if (options.identifierPrefix !== undefined) {
      identifierPrefix = options.identifierPrefix;
    }
    if (options.onUncaughtError !== undefined) {
      onUncaughtError = options.onUncaughtError;
    }
    if (options.onCaughtError !== undefined) {
      onCaughtError = options.onCaughtError;
    }
    if (options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }
    if (enableDefaultTransitionIndicator) {
      if (options.onDefaultTransitionIndicator !== undefined) {
        onDefaultTransitionIndicator = options.onDefaultTransitionIndicator;
      }
    }
    if (options.unstable_transitionCallbacks !== undefined) {
      transitionCallbacks = options.unstable_transitionCallbacks;
    }
  }

  // 创建 fiberRootNode (根FiberNode)
  const root = createContainer(
    container,
    ConcurrentRoot,
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    onDefaultTransitionIndicator,
    transitionCallbacks
  );

  markContainerAsRoot(root.current, container);

  const rootContainerElement: Document | Element | DocumentFragment =
    !disableCommentsAsDOMContainers && container.nodeType === COMMENT_NODE
      ? (container.parentNode: any)
      : container;

  //React中的事件
  listenToAllSupportedEvents(rootContainerElement);

  // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
  return new ReactDOMRoot(root);
}

// $FlowFixMe[missing-this-annot]
function ReactDOMHydrationRoot(internalRoot: FiberRoot) {
  this._internalRoot = internalRoot;
}
function scheduleHydration(target: Node) {
  // 这个方法允许你显式地调度一个 DOM 节点的 hydration。
  //此方法主要用于更细粒度地控制 hydration 过程。通常，当你调用 hydrateRoot 时，React 会尝试 hydration 整个提供的容器。
  // unstable_scheduleHydration 允许开发者（或 React 内部机制）在初始 hydration 之后，或者对于某些特定情况，指定某个 DOM 节点应该被 hydration。
  // 例如，如果你的页面有一部分内容是SSR的，但另一部分内容（比如一个评论区）是稍后通过客户端请求获取HTML片段并插入到页面中的，
  // 你可能希望在插入这个新的HTML片段后，显式地告诉React去 hydrate 这个新片段，而不是重新渲染整个应用或依赖于复杂的父组件状态来触发。
  // unstable_scheduleHydration 提供了一个底层的、不稳定的接口，用于将特定的 DOM 节点加入队列，
  // 以便 React 在后续的渲染周期中尝试对其进行 hydration。这对于处理复杂的、逐步 hydration 的场景可能非常有用。
  if (target) {
    queueExplicitHydrationTarget(target);
  }
}
// $FlowFixMe[prop-missing] found when upgrading Flow
ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = scheduleHydration;

// hydrateRoot 方法用于将已经存在的 DOM 结构与 React 组件进行“调和”，以确保它们保持同步
// 它允许 React 应用在客户端接管已经存在的 DOM 结构。
export function hydrateRoot(
  container: Document | Element,
  initialChildren: ReactNodeList,
  options?: HydrateRootOptions
): RootType {
  if (!isValidContainer(container)) {
    throw new Error("Target container is not a DOM element.");
  }

  warnIfReactDOMContainerInDEV(container);

  if (__DEV__) {
    if (initialChildren === undefined) {
      console.error(
        "Must provide initial children as second argument to hydrateRoot. " +
          "Example usage: hydrateRoot(domContainer, <App />)"
      );
    }
  }

  // For now we reuse the whole bag of options since they contain
  // the hydration callbacks.
  const hydrationCallbacks = options != null ? options : null;

  const concurrentUpdatesByDefaultOverride = false;
  let isStrictMode = false;
  let identifierPrefix = "";
  let onUncaughtError = defaultOnUncaughtError;
  let onCaughtError = defaultOnCaughtError;
  let onRecoverableError = defaultOnRecoverableError;
  let onDefaultTransitionIndicator = defaultOnDefaultTransitionIndicator;
  let transitionCallbacks = null;
  let formState = null;
  if (options !== null && options !== undefined) {
    if (options.unstable_strictMode === true) {
      isStrictMode = true;
    }
    if (options.identifierPrefix !== undefined) {
      identifierPrefix = options.identifierPrefix;
    }
    if (options.onUncaughtError !== undefined) {
      onUncaughtError = options.onUncaughtError;
    }
    if (options.onCaughtError !== undefined) {
      onCaughtError = options.onCaughtError;
    }
    if (options.onRecoverableError !== undefined) {
      onRecoverableError = options.onRecoverableError;
    }
    if (enableDefaultTransitionIndicator) {
      if (options.onDefaultTransitionIndicator !== undefined) {
        onDefaultTransitionIndicator = options.onDefaultTransitionIndicator;
      }
    }
    if (options.unstable_transitionCallbacks !== undefined) {
      transitionCallbacks = options.unstable_transitionCallbacks;
    }
    if (options.formState !== undefined) {
      formState = options.formState;
    }
  }

  // 简单来说，hydrateRoot 就是告诉 React：“看，这里有一些服务端已经渲染好的 HTML，请你接管它们，让它们在客户端‘活’起来，并且保持与我提供的 React 组件树一致。”
  const root = createHydrationContainer(
    initialChildren, //<App/>
    null,
    container,
    ConcurrentRoot,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    onDefaultTransitionIndicator,
    transitionCallbacks,
    formState
  );
  markContainerAsRoot(root.current, container);
  // This can't be a comment node since hydration doesn't work on comment nodes anyway.
  listenToAllSupportedEvents(container);

  // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
  return new ReactDOMHydrationRoot(root);
}

function warnIfReactDOMContainerInDEV(container: any) {
  if (__DEV__) {
    if (isContainerMarkedAsRoot(container)) {
      if (container._reactRootContainer) {
        console.error(
          "You are calling ReactDOMClient.createRoot() on a container that was previously " +
            "passed to ReactDOM.render(). This is not supported."
        );
      } else {
        console.error(
          "You are calling ReactDOMClient.createRoot() on a container that " +
            "has already been passed to createRoot() before. Instead, call " +
            "root.render() on the existing root instead if you want to update it."
        );
      }
    }
  }
}
