/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import {
  enableCreateEventHandleAPI,
  enableUseEffectEventHook,
} from "shared/ReactFeatureFlags";

// TODO:副作用标志
// 这些标志是在 Render 阶段的 beginWork 和 completeWork 过程中被设置的。
// 当 workInProgress 树构建完成后，React 会遍历这棵树，收集所有带有副作用标志的 Fiber 节点，并在 Commit 阶段按照特定顺序执行这些操作。
export type Flags = number;

// Don't change these values. They're used by React Dev Tools.
export const NoFlags = /*                      */ 0b0000000000000000000000000000000;
// 含义: 一个内部标志，表示这个 Fiber 节点在当前的 Render 阶段至少执行了一些工作，即使它最终可能被 bailout (跳过)。
// 这有助于 React 决定是否可以安全地重用上一次的输出。
// 设置时机: 在 beginWork 中，如果 Fiber 没有被完全跳过。
export const PerformedWork = /*                */ 0b0000000000000000000000000000001;
// 含义： 表示该 Fiber 节点对应的 DOM 元素需要被插入到 DOM 树中。这通常发生在组件首次渲染，或者一个之前未渲染的组件现在需要被渲染时。
// 设置时机： 在 reconcileChildren 过程中，当发现一个新的子节点时。
export const Placement = /*                    */ 0b0000000000000000000000000000010;
// 含义: 表示该 Fiber 节点 (通常是一个错误边界) 捕获了其子树中抛出的错误。
// 设置时机: 当错误边界捕获到错误时。
export const DidCapture = /*                   */ 0b0000000000000000000000010000000;

// 含义： 表示该 Fiber 节点正在进行服务端渲染 (SSR) 的注水 (hydration) 过程。它会尝试附加到现有的 DOM 结构上，而不是创建新的 DOM 节点。
// 设置时机： 在 hydrate 模式下，当协调 HostComponent 时。
export const Hydrating = /*                    */ 0b0000000000000000001000000000000;

// You can change the rest (and add more).
export const Update = /*                       */ 0b0000000000000000000000000000100;
// 含义： 表示该 Fiber 节点对应的 DOM 元素或组件的属性 (props)、状态 (state) 或上下文 (context) 发生了变化，需要更新。
// 对于 HostComponent，这可能意味着需要更新 DOM 属性、样式或事件监听器。对于 ClassComponent，可能需要调用 componentDidUpdate。
// 设置时机： 当 Diff 算法检测到 props 或 state 变化时。
export const Cloned = /*                       */ 0b0000000000000000000000000001000;
// 含义： 表示该 Fiber 节点及其子树需要从 DOM 中移除，并且需要执行相应的清理工作 (如调用 componentWillUnmount，解绑 ref，移除事件监听器等)。
// 设置时机： 当 reconcileChildren 发现某个旧的子节点在新子节点列表中不存在时。
export const ChildDeletion = /*                */ 0b0000000000000000000000000010000;
export const ContentReset = /*                 */ 0b0000000000000000000000000100000;
// 含义： 表示 Fiber 节点有回调函数需要执行，例如 setState 的回调参数。
// 设置时机： 当 setState 带有回调时。
export const Callback = /*                     */ 0b0000000000000000000000001000000;
/* Used by  :                            0b0000000000000000000000010000000; */

export const ForceClientRender = /*            */ 0b0000000000000000000000100000000;
// 含义： 表示该 Fiber 节点的 ref 需要被更新 (附加新的 ref 或分离旧的 ref)。
// 设置时机： 当组件挂载、卸载或 ref 对象/回调发生变化时。
export const Ref = /*                          */ 0b0000000000000000000001000000000;
// 含义： 对于类组件，标记需要在 DOM 更新前调用 getSnapshotBeforeUpdate 生命周期方法。
// 设置时机： 当类组件定义了 getSnapshotBeforeUpdate 并且即将更新时。
export const Snapshot = /*                     */ 0b0000000000000000000010000000000;
export const Passive = /*                      */ 0b0000000000000000000100000000000;
/* Used by Hydrating:                             0b0000000000000000001000000000000; */
// 含义: 与 <OffscreenComponent> 或类似特性相关，标记组件的可见性发生了变化，可能需要隐藏或显示 DOM 子树，并触发生存周期或 effect。
export const Visibility = /*                   */ 0b0000000000000000010000000000000;
export const StoreConsistency = /*             */ 0b0000000000000000100000000000000;

// It's OK to reuse these bits because these flags are mutually exclusive for
// different fiber types. We should really be doing this for as many flags as
// possible, because we're about to run out of bits.
export const Hydrate = Callback;
export const ScheduleRetry = StoreConsistency;
export const ShouldSuspendCommit = Visibility;
export const ViewTransitionNamedMount = ShouldSuspendCommit;
export const DidDefer = ContentReset;
export const FormReset = Snapshot;
export const AffectedParentLayout = ContentReset;

// 生命周期标志
// 这些标志主要与类组件的生命周期方法和 Hooks 的 effect 相关。
// 包含了与组件生命周期和 Hooks (Layout, Passive) 相关的副作用。
export const LifecycleEffectMask =
  Passive | Update | Callback | Ref | Snapshot | StoreConsistency;

// Union of all commit flags (flags with the lifetime of a particular commit)
// 包含了所有可能影响宿主环境 (如 DOM) 的副作用，例如 Placement, Update, Deletion, Ref, Hydrating, Visibility 等。
export const HostEffectMask = /*               */ 0b0000000000000000111111111111111;

// These are not really side effects, but we still reuse this field.
export const Incomplete = /*                   */ 0b0000000000000001000000000000000;
// 含义: 在 Render 阶段，如果一个组件抛出错误，其父级错误边界会被标记上 ShouldCapture，表明它应该尝试捕获这个错误。
export const ShouldCapture = /*                */ 0b0000000000000010000000000000000;
export const ForceUpdateForLegacySuspense = /* */ 0b0000000000000100000000000000000;
export const DidPropagateContext = /*          */ 0b0000000000001000000000000000000;
export const NeedsPropagation = /*             */ 0b0000000000010000000000000000000;
export const Forked = /*                       */ 0b0000000000100000000000000000000;

// Static tags describe aspects of a fiber that are not specific to a render,
// e.g. a fiber uses a passive effect (even if there are no updates on this particular render).
// This enables us to defer more work in the unmount case,
// since we can defer traversing the tree during layout to look for Passive effects,
// and instead rely on the static flag as a signal that there may be cleanup work.
export const SnapshotStatic = /*               */ 0b0000000001000000000000000000000;
export const LayoutStatic = /*                 */ 0b0000000010000000000000000000000;
export const RefStatic = LayoutStatic;
export const PassiveStatic = /*                */ 0b0000000100000000000000000000000;
export const MaySuspendCommit = /*             */ 0b0000001000000000000000000000000;
// ViewTransitionNamedStatic tracks explicitly name ViewTransition components deeply
// that might need to be visited during clean up. This is similar to SnapshotStatic
// if there was any other use for it. It also needs to run in the same phase as
// MaySuspendCommit tracking.
export const ViewTransitionNamedStatic =
  /*    */ SnapshotStatic | MaySuspendCommit;
// ViewTransitionStatic tracks whether there are an ViewTransition components from
// the nearest HostComponent down. It resets at every HostComponent level.
export const ViewTransitionStatic = /*         */ 0b0000010000000000000000000000000;

// Flag used to identify newly inserted fibers. It isn't reset after commit unlike `Placement`.
export const PlacementDEV = /*                 */ 0b0000100000000000000000000000000;
export const MountLayoutDev = /*               */ 0b0001000000000000000000000000000;
export const MountPassiveDev = /*              */ 0b0010000000000000000000000000000;

// Groups of flags that are used in the commit phase to skip over trees that
// don't contain effects, by checking subtreeFlags.

export const BeforeMutationMask: number =
  Snapshot |
  (enableCreateEventHandleAPI
    ? // createEventHandle needs to visit deleted and hidden trees to
      // fire beforeblur
      // TODO: Only need to visit Deletions during BeforeMutation phase if an
      // element is focused.
      Update | ChildDeletion | Visibility
    : enableUseEffectEventHook
    ? // TODO: The useEffectEvent hook uses the snapshot phase for clean up but it
      // really should use the mutation phase for this or at least schedule an
      // explicit Snapshot phase flag for this.
      Update
    : 0);

// For View Transition support we use the snapshot phase to scan the tree for potentially
// affected ViewTransition components.
export const BeforeAndAfterMutationTransitionMask: number =
  Snapshot | Update | Placement | ChildDeletion | Visibility | ContentReset;
// 包含了所有会导致 DOM 树结构发生变更的副作用，主要是 Placement, Update, Deletion, HostText 的内容更新。
export const MutationMask =
  Placement |
  Update |
  ChildDeletion |
  ContentReset |
  Ref |
  Hydrating |
  Visibility |
  FormReset;

// 包含了所有需要在 Layout 阶段执行的副作用，主要是 Update (对于 componentDidMount/Update) 和 Ref。
export const LayoutMask = Update | Callback | Ref | Visibility;

// TODO: Split into PassiveMountMask and PassiveUnmountMask
// 包含了所有需要在 Passive 阶段执行的副作用
// 含义： 标记需要执行 useEffect Hook 的回调函数。这些 effect 是在浏览器绘制完成后异步执行的，不会阻塞浏览器渲染。
// 设置时机： 当组件挂载或更新，并且定义了相应的 passive effect 时。
export const PassiveMask = Passive | Visibility | ChildDeletion;

// For View Transitions we need to visit anything we visited in the snapshot phase to
// restore the view-transition-name after committing the transition.
export const PassiveTransitionMask: number = PassiveMask | Update | Placement;

// Union of tags that don't get reset on clones.
// This allows certain concepts to persist without recalculating them,
// e.g. whether a subtree contains passive effects or portals.
export const StaticMask =
  LayoutStatic |
  PassiveStatic |
  RefStatic |
  MaySuspendCommit |
  ViewTransitionStatic |
  ViewTransitionNamedStatic;
