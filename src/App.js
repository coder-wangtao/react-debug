// import RefApp from "@/components/ref";
// import Counter from "@/components/counter";
// import InfiniteLoopUseEffectApp from "@/components/InfiniteLoop/useEffect";
// import UseIdApp from "@/components/useId";
// import EventApp from "@/components/event";
// import StopEventComponent from "@/components/event/stopEventComponent";

// import SetStateApp from "@/components/setState";

// import UseHookApp from "@/components/useHook";
// import UseHookHocApp from "@/components/useHookHoc";
// import UseHookRenderPropsApp from "@/components/useHookRenderProps";
// import UseRefApp from "@/components/useRef";
// import UseEffectApp from "@/components/useEffect";
// import UseReducerApp from "@/components/useReducer";
// import MemoApp from "@/components/memo";

// import SetStateAsyncApp from "@/components/setState/async";
// import SetStatePromiseApp from "@/components/setState/promise";
// import SetStateCounterApp from "@/components/setState/counter";

// import EmptyComponent from "@/components/EmptyComponent";

// import AutomaticApp from "@/components/batching/Automatic";
// // import ConcurrentApp from "@/components/batching/Concurrent";

// import SetTimeoutApp from "@/components/setTimeout";
// import TailwindApp from "@/components/tailwind";

// import ConcurrentApp from "@/components/concurrent";
// import InfiniteScrollApp from "@/components/InfiniteScroll";

// // import TodoList from "@/components/todoList";
// // import TodoListNoKey from "@/components/todoList/NoKey";
// // import TodoListWithKey from "@/components/todoList/WithKey";

// // import TodoListNoKey from "@/components/render-list/NoKey";
// // import TodoListReorderKey from "@/components/render-list/ReorderKey";

// import CounterReduxApp from "@/components/counter-redux";

// function App() {
//   return (
//     <div id="app">
//       {/* <InfiniteScrollApp /> */}
//       {/* <ConcurrentApp /> */}
//       {/* <RefApp /> */}
//       {/* <RefApp /> */}
//       {/* <Counter /> */}
//       {/* <UseEffectApp /> */}
//       {/* <UseIdApp /> */}
//       {/* <EmptyComponent /> */}

//       {/* <EventApp /> */}
//       {/* <StopEventComponent /> */}

//       {/* <SetTimeoutApp /> */}

//       {/* <PromiseApp /> */}
//       {/* <AsyncApp /> */}
//       {/* <SetStateCounterApp /> */}

//       {/* <AutomaticApp /> */}
//       {/* <ConcurrentApp /> */}

//       {/* <TodoList /> */}
//       {/* <TodoListNoKey /> */}
//       {/* <TodoListWithKey /> */}
//       {/* <TodoListReorderKey /> */}

//       {/* <SetStateApp /> */}

//       {/* <UseHookApp /> */}
//       {/* <UseHookHocApp /> */}
//       {/* <UseHookRenderPropsApp /> */}
//       {/* <UseRefApp /> */}
//       {/* <UseEffectApp /> */}
//       {/* <UseReducerApp /> */}
//       {/* <MemoApp /> */}
//       {/* <TailwindApp /> */}

//       {/* <SetStateAsyncApp /> */}
//       {/* <SetStatePromiseApp /> */}

//       <CounterReduxApp />
//     </div>
//   );
// }

// export default App;
import { useRef, useEffect, useState } from "react";
const App = () => {
  const divRef = useRef();
  const pRef = useRef();

  const parentBubble = () => {
    console.log("父元素React事件冒泡");
  };
  const childBubble = () => {
    console.log("子元素React事件冒泡");
  };
  const parentCapture = () => {
    console.log("父元素React事件捕获");
  };
  const childCapture = () => {
    console.log("子元素React事件捕获");
  };

  useEffect(() => {
    // divRef.current.addEventListener(
    //   "click",
    //   () => {
    //     console.log("父元素原生捕获");
    //   },
    //   true
    // );
    // divRef.current.addEventListener("click", () => {
    //   console.log("父元素原生冒泡");
    // });
    // pRef.current.addEventListener(
    //   "click",
    //   () => {
    //     console.log("子元素原生捕获");
    //   },
    //   true
    // );
    // pRef.current.addEventListener("click", () => {
    //   console.log("子元素原生冒泡");
    // });
    // document.addEventListener(
    //   "click",
    //   () => {
    //     console.log("document原生捕获");
    //   },
    //   true
    // );
    // document.addEventListener("click", () => {
    //   console.log("document原生冒泡");
    // });
  }, []);

  return (
    <div ref={divRef} onClick={parentBubble} onClickCapture={parentCapture}>
      <p ref={pRef} onClick={childBubble} onClickCapture={childCapture}>
        事件执行顺序
      </p>
    </div>
  );
};

export default App;
