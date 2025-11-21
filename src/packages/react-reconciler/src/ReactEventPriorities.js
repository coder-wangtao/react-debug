/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Lane, Lanes } from "./ReactFiberLane";

import {
  NoLane,
  SyncLane,
  InputContinuousLane,
  DefaultLane,
  IdleLane,
  getHighestPriorityLane,
  includesNonIdleWork,
} from "./ReactFiberLane";

export opaque type EventPriority = Lane;

export const NoEventPriority: EventPriority = NoLane;
// DiscreteEventPriority (离散事件优先级): 通常会映射到 SyncLane 或一个非常高优先级的 Lane (例如 InputDiscreteLane)。
// 这意味着这类更新会被优先处理，很多情况下会同步执行，以保证用户操作的即时反馈。
// 例如，用户点击一个按钮触发 setState，这个更新通常会获得 SyncLane，使得 UI 变化立即发生。
export const DiscreteEventPriority: EventPriority = SyncLane;
// ContinuousEventPriority (连续事件优先级): 会映射到一个中等优先级的 Lane (例如 InputContinuousLane)。
// 这类更新虽然不如离散事件紧急，但也需要及时响应，以避免用户感觉到卡顿。
// 例如，用户拖动一个滑块，滑块位置的更新会以 InputContinuousLane 来处理。
export const ContinuousEventPriority: EventPriority = InputContinuousLane;
// DefaultEventPriority (默认事件优先级): 会映射到一个较低优先级的 Lane (例如 DefaultLane 或 NormalLane)。
// 这类更新通常是后台任务、数据获取后的 UI 更新等，它们可以被更高优先级的任务（如用户输入）中断。
// 例如，useEffect 中发起一个网络请求，请求成功后调用 setState 更新数据，这个更新通常会使用 DefaultLane。
export const DefaultEventPriority: EventPriority = DefaultLane;
//空闲时间
export const IdleEventPriority: EventPriority = IdleLane;

export function higherEventPriority(
  a: EventPriority,
  b: EventPriority
): EventPriority {
  return a !== 0 && a < b ? a : b;
}

export function lowerEventPriority(
  a: EventPriority,
  b: EventPriority
): EventPriority {
  return a === 0 || a > b ? a : b;
}

export function isHigherEventPriority(
  a: EventPriority,
  b: EventPriority
): boolean {
  return a !== 0 && a < b;
}

export function eventPriorityToLane(updatePriority: EventPriority): Lane {
  return updatePriority;
}

export function lanesToEventPriority(lanes: Lanes): EventPriority {
  const lane = getHighestPriorityLane(lanes);
  if (!isHigherEventPriority(DiscreteEventPriority, lane)) {
    return DiscreteEventPriority;
  }
  if (!isHigherEventPriority(ContinuousEventPriority, lane)) {
    return ContinuousEventPriority;
  }
  if (includesNonIdleWork(lane)) {
    return DefaultEventPriority;
  }
  return IdleEventPriority;
}
