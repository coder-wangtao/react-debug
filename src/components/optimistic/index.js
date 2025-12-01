import { startTransition, useOptimistic, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [optimisticState, addOptimistic] = useOptimistic(
    tasks,
    (currentTask, newTask) => {
      //currentTask 原来的所有数据（tasks）
      //newTask 新的一条数据
      return [...currentTask, newTask];
    }
  );
  const addTask = (task) => {
    startTransition(async () => {
      try {
        //先更新乐观值
        addOptimistic(task);
        //调接口
        await fakeApi(task);
        //再更新真实值
        setTasks((current) => [...current, task]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <h1>待办事项列表</h1>
      <ul>
        {optimisticState.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
      <button onClick={() => addTask("新任务")}>添加任务</button>
    </div>
  );
}

export default TaskList;

const fakeApi = (task) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`任务${task}成功添加`);
      } else {
        reject(`任务添加失败`);
      }
    }, 1000);
  });
};
