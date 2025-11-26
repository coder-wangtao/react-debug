/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { DOMEventName } from "./DOMEventNames";

import { enableCreateEventHandleAPI } from "shared/ReactFeatureFlags";

export const allNativeEvents: Set<DOMEventName> = new Set();

if (enableCreateEventHandleAPI) {
  allNativeEvents.add("beforeblur");
  allNativeEvents.add("afterblur");
}

/**
 * Mapping from registration name to event name
 */
export const registrationNameDependencies: {
  [registrationName: string]: Array<DOMEventName>,
} = {};

/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in __DEV__.
 * @type {Object}
 */
export const possibleRegistrationNames: {
  [lowerCasedName: string]: string,
} = __DEV__ ? {} : (null: any);
// Trust the developer to only use possibleRegistrationNames in __DEV__
//TODO:双阶段事件注册
export function registerTwoPhaseEvent(
  registrationName: string,
  dependencies: Array<DOMEventName>
): void {
  // 注册普通的事件名（如 onClick）
  registerDirectEvent(registrationName, dependencies);
  // 注册带 Capture 后缀的事件名（如 onClickCapture）
  registerDirectEvent(registrationName + "Capture", dependencies);
}

export function registerDirectEvent(
  registrationName: string,
  dependencies: Array<DOMEventName>
) {
  if (__DEV__) {
    if (registrationNameDependencies[registrationName]) {
      console.error(
        "EventRegistry: More than one plugin attempted to publish the same " +
          "registration name, `%s`.",
        registrationName
      );
    }
  }

  registrationNameDependencies[registrationName] = dependencies;

  if (__DEV__) {
    const lowerCasedName = registrationName.toLowerCase();
    possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === "onDoubleClick") {
      possibleRegistrationNames.ondblclick = registrationName;
    }
  }

  for (let i = 0; i < dependencies.length; i++) {
    allNativeEvents.add(dependencies[i]);
  }
}
