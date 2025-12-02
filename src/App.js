import RefApp from "@/components/ref";
import Counter from "@/components/counter";
import UseEffectApp from "@/components/InfiniteLoop/useEffect";
import UseIdApp from "@/components/useId";
import EventApp from "@/components/event";
import AsyncApp from "@/components/setState/async";
import PromiseApp from "@/components/setState/promise";
import EmptyComponent from "@/components/EmptyComponent";
import ActionComponent from "@/components/useAction";
import FormComponent from "@/components/form";
import OptimisticComponent from "@/components/optimistic";
import FormStatus from "@/components/formStatus";
import Ref19 from "@/components/ref19";

import AutomaticApp from "@/components/batching/Automatic";
import ConcurrentApp from "@/components/batching/Concurrent";
import EventTest from "@/components/event-test";
import SchedulerTest from "@/components/scheduler-test";

import React, { startTransition, useState } from "react";
import { useActionState } from "react";
// import {
//   useState,
//   createContext,
//   useContext,
//   Suspense,
//   use,
//   useEffect,
// } from "react";

// import ReactDOM from "react-dom/client";
// const ctxA = createContext("default A");
// const ctxB = createContext("default B");

// const delay = (t) =>
//   new Promise((r) => {
//     setTimeout(r, t);
//   });

// const cachePool = [];

// function fetchData(id, timeout) {
//   const cache = cachePool[id];
//   if (cache) {
//     return cache;
//   }
//   return (cachePool[id] = delay(timeout).then(() => {
//     debugger;
//     return { data: Math.random().toFixed(2) * 100 };
//   }));
// }

// const Cpn = ({ id, timeout }) => {
//   const [num, updateNum] = useState(0);
//   const { data } = use(fetchData(id, timeout));

//   if (num !== 0 && num % 5 === 0) {
//     cachePool[id] = null;
//   }

//   useEffect(() => {
//     console.log("effect create");
//     return () => console.log("effect destroy");
//   }, []);

//   return (
//     <ul onClick={() => updateNum((n) => n + 1)}>
//       <li>ID: {id}</li>
//       <li>随机数: {data}</li>
//       <li>状态: {num}</li>
//     </ul>
//   );
// };

function App() {
  const [name, setName] = useState("");
  const updateData = (name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(name);
      }, 1000);
    });
  };
  const [state, handleSubmit, isPending] = useActionState(
    async (prevState, name) => {
      try {
        const res = await updateData(name);
        return res;
      } catch (error) {
        return error.message;
      }
    },
    "初始化"
  );
  return (
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        disabled={isPending}
        onClick={
          () => {
            handleSubmit(name);
          }
          // startTransition(() => {
          // })
        }
      >
        提交
      </button>
      <h1>{state}</h1>
    </div>
  );
  // return (
  //   <Suspense fallback={<div>loading...</div>}>
  //     <Cpn id={0} timeout={3000} />
  //   </Suspense>
  // );
}

// function App() {
//   return (
//     <ctxA.Provider value={"A0"}>
//       <ctxB.Provider value={"B0"}>
//         <ctxA.Provider value={"A1"}>
//           <Cpn />
//         </ctxA.Provider>
//       </ctxB.Provider>
//       <Cpn />
//     </ctxA.Provider>
//   );
// }

// function Cpn() {
//   const a = useContext(ctxA);
//   const b = useContext(ctxB);
//   return (
//     <div>
//       A: {a} B: {b}
//     </div>
//   );
// }

export default App;
