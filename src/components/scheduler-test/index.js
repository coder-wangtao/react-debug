import { unstable_scheduleCallback } from "../../packages/scheduler/src/forks/Scheduler";
// 模拟函数的执行

export default () => {
  const sleep = (delay) => {
    for (let start = Date.now(); Date.now() - start <= delay; ) {}
  };
  //1 4 5 2 3
  unstable_scheduleCallback(3, () => {
    console.log(1);
  });

  unstable_scheduleCallback(3, () => {
    console.log(2);
  });

  unstable_scheduleCallback(3, () => {
    console.log(3);
  });

  unstable_scheduleCallback(3, () => {
    console.log(4);
  });

  unstable_scheduleCallback(3, () => {
    console.log(5);
  });
};
