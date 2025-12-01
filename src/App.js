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

function App() {
  // const [name, setName] = useState("");

  // const updateData = (name) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(name);
  //     }, 1000);
  //   });
  // };
  // const [state, handleSubmit, isPending] = useActionState(
  //   async (prevState, name) => {
  //     try {
  //       const res = await updateData(name);
  //       return res;
  //     } catch (error) {
  //       return error.message;
  //     }
  //   },
  //   "初始化"
  // );

  // return (
  //   <div>
  //     <input
  //       value={name}
  //       onChange={(e) => {
  //         setName(e.target.value);
  //       }}
  //     />
  //     <button
  //       disabled={isPending}
  //       onClick={() =>
  //         startTransition(() => {
  //           handleSubmit(name);
  //         })
  //       }
  //     >
  //       提交
  //     </button>
  //     <h1>{state}</h1>
  //   </div>
  // );
  return <OptimisticComponent />;
}

export default App;
