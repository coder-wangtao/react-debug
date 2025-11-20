/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ReactDebugInfo } from "./ReactTypes";
//TODO：ReactElement
//
export type ReactElement = {
  $$typeof: any, // 唯一标识，防止 XSS 攻击
  // 元素类型：字符串（DOM 标签）或函数/类（组件）
  // 字符串: 对于原生 DOM 元素，type 是一个字符串，例如 'div'、'span'、'h1' 等。
  // 函数或类: 对于 React 组件，type 是组件的函数或类本身，例如 App、MyButton 等。
  type: any,
  // 用于列表渲染的唯一标识
  key: any,
  // 用于获取 DOM 实例或组件实例的引用
  ref: any,
  // 元素的属性，包括 children
  // props: {
  //   className: "greeting",
  //   children: "Hello, world!",
  // },
  props: any,

  // __DEV__ or for string refs
  _owner: any,

  // __DEV__
  _store: { validated: 0 | 1 | 2, ... }, // 0: not validated, 1: validated, 2: force fail
  _debugInfo: null | ReactDebugInfo,
  _debugStack: Error,
  _debugTask: null | ConsoleTask,
};
