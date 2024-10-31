import React, { useEffect } from "react";

function StopEventComponent() {
  useEffect(() => {
    // 添加原生事件监听器
    document.addEventListener("click", handleNativeClick);
    document
      .querySelector(".box1")
      .addEventListener("click", box1HandleNativeClick);

    return () => {
      // 组件卸载时，移除原生事件监听器
      document.removeEventListener("click", handleNativeClick);
      document
        .querySelector(".box1")
        .removeEventListener("click", handleNativeClick);
    };
  }, []);

  const handleNativeClick = () => {
    console.log("document.原生事件被触发");
  };

  const box1HandleNativeClick = (event) => {
    console.log("box1.原生事件被触发");
    // event.stopImmediatePropagation();
  };

  // 阻止原生事件
  const stopNativeEvent = (event) => {
    // event.preventDefault();
    // event.nativeEvent.stopImmediatePropagation();
    console.log("React 合成事件被触发 - 阻止了原生事件");
  };

  // 不阻止原生事件
  const noStopNativeEvent = (event) => {
    console.log("React 合成事件被触发 - 没有阻止原生事件");
  };

  // 阻止事件冒泡
  const stopEventPropagation = (event) => {
    event.stopPropagation();
    console.log("React 合成事件被触发 - 阻止了事件冒泡");
  };

  // 不阻止事件冒泡
  const noStopEventPropagation = (event) => {
    console.log("React 合成事件被触发 - 没有阻止事件冒泡");
  };

  // 阻止默认行为
  const stopDefaultBehavior = (event) => {
    event.preventDefault();
    console.log("React 合成事件被触发 - 阻止了默认行为");
  };

  // 不阻止默认行为
  const noStopDefaultBehavior = (event) => {
    console.log("React 合成事件被触发 - 没有阻止默认行为");
  };

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      <button
        onClick={stopNativeEvent}
        className="box1"
        style={{ marginRight: "10px" }}
      >
        阻止原生事件
      </button>

      <button onClick={noStopNativeEvent} style={{ marginRight: "10px" }}>
        不阻止原生事件
      </button>

      <button onClick={stopEventPropagation} style={{ marginRight: "10px" }}>
        阻止事件冒泡
      </button>

      <button onClick={noStopEventPropagation} style={{ marginRight: "10px" }}>
        不阻止事件冒泡
      </button>

      <a
        href="https://www.example.com"
        onClick={stopDefaultBehavior}
        style={{ marginRight: "10px" }}
      >
        阻止默认行为 (点击后不跳转)
      </a>

      <a
        href="https://www.example.com"
        onClick={noStopDefaultBehavior}
        style={{ marginRight: "10px" }}
      >
        不阻止默认行为 (点击跳转)
      </a>
    </div>
  );
}

export default StopEventComponent;
