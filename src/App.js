import RefApp from "@/components/ref";
import Counter from "@/components/counter";
import UseEffectApp from "@/components/InfiniteLoop/useEffect";
import UseIdApp from "@/components/useId";
import EventApp from "@/components/event";
import StopEventComponent from "@/components/event/stopEventComponent";

import SetStateApp from "@/components/setState";
import SetStateAsyncApp from "@/components/setState/async";
import SetStatePromiseApp from "@/components/setState/promise";
import SetStateCounterApp from "@/components/setState/counter";

import EmptyComponent from "@/components/EmptyComponent";

import AutomaticApp from "@/components/batching/Automatic";
import ConcurrentApp from "@/components/batching/Concurrent";

import SetTimeoutApp from "@/components/setTimeout";

// import TodoList from "@/components/todoList";
// import TodoListNoKey from "@/components/todoList/NoKey";
// import TodoListWithKey from "@/components/todoList/WithKey";

// import TodoListNoKey from "@/components/render-list/NoKey";
// import TodoListReorderKey from "@/components/render-list/ReorderKey";

function App() {
  return (
    <div id="app">
      {/* <RefApp /> */}
      {/* <RefApp /> */}
      <Counter />
      {/* <UseEffectApp /> */}
      {/* <UseIdApp /> */}
      {/* <EmptyComponent /> */}

      {/* <EventApp /> */}
      {/* <StopEventComponent /> */}

      {/* <SetTimeoutApp /> */}

      {/* <PromiseApp /> */}
      {/* <AsyncApp /> */}
      {/* <SetStateCounterApp /> */}

      {/* <AutomaticApp /> */}
      {/* <ConcurrentApp /> */}

      {/* <TodoList /> */}
      {/* <TodoListNoKey /> */}
      {/* <TodoListWithKey /> */}
      {/* <TodoListReorderKey /> */}

      {/* <SetStateApp /> */}
      {/* <SetStateAsyncApp /> */}
      {/* <SetStatePromiseApp /> */}
    </div>
  );
}

export default App;
