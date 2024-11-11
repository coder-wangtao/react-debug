import React, { useEffect, useRef } from "react";
import "./index.css"; // 引入 CSS 文件

const SeamlessScroll = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    const parent = contentRef.current;
    const box = containerRef.current;
    box.style.width = `${el.clientWidth}px`;
    parent.append(el.cloneNode(true)); // 复制元素实现无缝滚动

    let x = 0;

    const run = () => {
      x -= 0.5; // 控制滚动速度
      if (Math.abs(x) >= el.clientWidth) {
        x = 0;
      }
      parent.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(run);
    };

    run(); // 启动动画
  }, []);

  return (
    <div ref={containerRef} className="container">
      <div ref={contentRef} className="content">
        <div ref={itemRef} className="item">
          1234567890abcdefg
        </div>
      </div>
    </div>
  );
};

export default SeamlessScroll;
