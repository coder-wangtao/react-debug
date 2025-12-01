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

import React, { useState } from "react";

function App() {
  const [arr, setArr] = useState(["1", "2", "3"]);
  function handleClick() {
    setArr(["2", "3", "1"]);
  }

  return (
    <div>
      <h2 onClick={handleClick}>点我改变数组</h2>
      <ul>
        {arr.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
