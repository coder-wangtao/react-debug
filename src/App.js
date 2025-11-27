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

function App() {
  return (
    <div id="app">
      {/* <RefApp /> */}
      {/* <Counter /> */}
      {/* <UseEffectApp /> */}
      {/* <UseIdApp /> */}
      {/* <EmptyComponent /> */}
      {/* <EventApp /> */}
      {/* <PromiseApp /> */}
      {/* <AsyncApp /> */}

      {/* <AutomaticApp /> */}
      {/* <ConcurrentApp /> */}
      {/* <Ref19 /> */}
      <SchedulerTest />
    </div>
  );
}

export default App;
