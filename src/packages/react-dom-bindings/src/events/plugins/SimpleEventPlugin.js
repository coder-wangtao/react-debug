/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { DOMEventName } from "../../events/DOMEventNames";
import type { Fiber } from "react-reconciler/src/ReactInternalTypes";
import type { AnyNativeEvent } from "../../events/PluginModuleType";
import type { DispatchQueue } from "../DOMPluginEventSystem";
import type { EventSystemFlags } from "../EventSystemFlags";
import type { ReactSyntheticEvent } from "../ReactSyntheticEventType";

import {
  SyntheticEvent,
  SyntheticKeyboardEvent,
  SyntheticFocusEvent,
  SyntheticMouseEvent,
  SyntheticDragEvent,
  SyntheticTouchEvent,
  SyntheticAnimationEvent,
  SyntheticTransitionEvent,
  SyntheticUIEvent,
  SyntheticWheelEvent,
  SyntheticClipboardEvent,
  SyntheticPointerEvent,
  SyntheticToggleEvent,
} from "../../events/SyntheticEvent";

import {
  ANIMATION_END,
  ANIMATION_ITERATION,
  ANIMATION_START,
  TRANSITION_END,
} from "../DOMEventNames";
import {
  topLevelEventsToReactNames,
  registerSimpleEvents,
} from "../DOMEventProperties";
import {
  accumulateSinglePhaseListeners,
  accumulateEventHandleNonManagedNodeListeners,
} from "../DOMPluginEventSystem";
import {
  IS_EVENT_HANDLE_NON_MANAGED_NODE,
  IS_CAPTURE_PHASE,
} from "../EventSystemFlags";

import getEventCharCode from "../getEventCharCode";

import { enableCreateEventHandleAPI } from "shared/ReactFeatureFlags";

function extractEvents(
  dispatchQueue: DispatchQueue,
  domEventName: DOMEventName,
  targetInst: null | Fiber,
  nativeEvent: AnyNativeEvent,
  nativeEventTarget: null | EventTarget,
  eventSystemFlags: EventSystemFlags,
  targetContainer: EventTarget
): void {
  // 映射原生事件到 React 事件名：将如 click 映射到 onClick
  // 选择合适的合成事件构造函数：根据原生事件类型（如 MouseEvent, KeyboardEvent）选择对应的 SyntheticMouseEvent, SyntheticKeyboardEvent 等
  // 处理特定事件的浏览器兼容性问题：例如，过滤掉 Firefox 中由鼠标右键触发的 click 事件，或处理 focusin/focusout 到 onFocus/onBlur 的转换
  // 收集监听器：调用 accumulateSinglePhaseListeners（或在特定情况下调用 accumulateEventHandleNonManagedNodeListeners）来遍历 Fiber 树，收集捕获和冒泡阶段的事件处理函数
  // 创建合成事件对象：如果收集到监听器，则创建一个合成事件实例
  // 推入调度队列：将合成事件和监听器列表推入 dispatchQueue
  const reactName = topLevelEventsToReactNames.get(domEventName);
  if (reactName === undefined) {
    return;
  }
  let SyntheticEventCtor = SyntheticEvent;
  let reactEventType: string = domEventName;
  switch (domEventName) {
    case "keypress":
      // Firefox creates a keypress event for function keys too. This removes
      // the unwanted keypress events. Enter is however both printable and
      // non-printable. One would expect Tab to be as well (but it isn't).
      // TODO: Fixed in https://bugzilla.mozilla.org/show_bug.cgi?id=968056. Can
      // probably remove.
      if (getEventCharCode(((nativeEvent: any): KeyboardEvent)) === 0) {
        return;
      }
    /* falls through */
    case "keydown":
    case "keyup":
      SyntheticEventCtor = SyntheticKeyboardEvent;
      break;
    case "focusin":
      reactEventType = "focus";
      SyntheticEventCtor = SyntheticFocusEvent;
      break;
    case "focusout":
      reactEventType = "blur";
      SyntheticEventCtor = SyntheticFocusEvent;
      break;
    case "beforeblur":
    case "afterblur":
      SyntheticEventCtor = SyntheticFocusEvent;
      break;
    case "click":
      // Firefox creates a click event on right mouse clicks. This removes the
      // unwanted click events.
      // TODO: Fixed in https://phabricator.services.mozilla.com/D26793. Can
      // probably remove.
      if (nativeEvent.button === 2) {
        return;
      }
    /* falls through */
    case "auxclick":
    case "dblclick":
    case "mousedown":
    case "mousemove":
    case "mouseup":
    // TODO: Disabled elements should not respond to mouse events
    /* falls through */
    case "mouseout":
    case "mouseover":
    case "contextmenu":
      SyntheticEventCtor = SyntheticMouseEvent;
      break;
    case "drag":
    case "dragend":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "dragstart":
    case "drop":
      SyntheticEventCtor = SyntheticDragEvent;
      break;
    case "touchcancel":
    case "touchend":
    case "touchmove":
    case "touchstart":
      SyntheticEventCtor = SyntheticTouchEvent;
      break;
    case ANIMATION_END:
    case ANIMATION_ITERATION:
    case ANIMATION_START:
      SyntheticEventCtor = SyntheticAnimationEvent;
      break;
    case TRANSITION_END:
      SyntheticEventCtor = SyntheticTransitionEvent;
      break;
    case "scroll":
    case "scrollend":
      SyntheticEventCtor = SyntheticUIEvent;
      break;
    case "wheel":
      SyntheticEventCtor = SyntheticWheelEvent;
      break;
    case "copy":
    case "cut":
    case "paste":
      SyntheticEventCtor = SyntheticClipboardEvent;
      break;
    case "gotpointercapture":
    case "lostpointercapture":
    case "pointercancel":
    case "pointerdown":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "pointerup":
      SyntheticEventCtor = SyntheticPointerEvent;
      break;
    case "toggle":
    case "beforetoggle":
      // MDN claims <details> should not receive ToggleEvent contradicting the spec: https://html.spec.whatwg.org/multipage/indices.html#event-toggle
      SyntheticEventCtor = SyntheticToggleEvent;
      break;
    default:
      // Unknown event. This is used by createEventHandle.
      break;
  }

  //事件是先捕获，后冒泡
  const inCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;

  if (
    enableCreateEventHandleAPI &&
    eventSystemFlags & IS_EVENT_HANDLE_NON_MANAGED_NODE
  ) {
    const listeners = accumulateEventHandleNonManagedNodeListeners(
      // TODO: this cast may not make sense for events like
      // "focus" where React listens to e.g. "focusin".
      ((reactEventType: any): DOMEventName),
      targetContainer,
      inCapturePhase
    );
    if (listeners.length > 0) {
      // Intentionally create event lazily.
      const event: ReactSyntheticEvent = new SyntheticEventCtor(
        reactName,
        reactEventType,
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({ event, listeners });
    }
  } else {
    // Some events don't bubble in the browser.
    // In the past, React has always bubbled them, but this can be surprising.
    // We're going to try aligning closer to the browser behavior by not bubbling
    // them in React either. We'll start by not bubbling onScroll, and then expand.
    const accumulateTargetOnly =
      !inCapturePhase &&
      // TODO: ideally, we'd eventually add all events from
      // nonDelegatedEvents list in DOMPluginEventSystem.
      // Then we can remove this special list.
      // This is a breaking change that can wait until React 18.
      (domEventName === "scroll" || domEventName === "scrollend");

    const listeners = accumulateSinglePhaseListeners(
      targetInst,
      reactName,
      nativeEvent.type,
      inCapturePhase,
      accumulateTargetOnly,
      nativeEvent
    );

    if (listeners.length > 0) {
      // Intentionally create event lazily.
      // react的合成事件
      const event: ReactSyntheticEvent = new SyntheticEventCtor(
        reactName,
        reactEventType,
        null,
        nativeEvent,
        nativeEventTarget
      );
      dispatchQueue.push({ event, listeners });
    }
  }
}

export { registerSimpleEvents as registerEvents, extractEvents };
