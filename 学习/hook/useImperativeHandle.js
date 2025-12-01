// 挂载阶段：创建并注册 ImperativeHandle
function mountImperativeHandle(ref, create, deps) {
  // 1. 创建新的 Hook 节点（工作进度中的 Hook）
  const hook = mountWorkInProgressHook();

  // 2. 保存 create 函数引用（实际会做依赖收集，此处简化）
  const nextCreate = create;

  // 3. 创建实例对象（实际源码包含更多状态跟踪字段）
  const inst = {
    pendingCount: 0, // 跟踪未完成的 effect 数量（简化实现未使用）
    // 其他内部状态字段...
  };

  // 4. 注册副作用：在 DOM 更新后设置 ref
  useEffect(
    () => {
      // 5. 仅当 ref 是对象类型时才赋值（函数 ref 由 React 内部处理）
      if (typeof ref === "object" && ref !== null) {
        // 6. 执行 create 函数获取要暴露的实例对象
        const value = nextCreate();
        // 7. 将实例赋值给 ref.current（父组件可通过 ref 访问）
        ref.current = value;
      }
    },
    // 8. 依赖数组：当 deps 变化时重新执行 effect
    deps || [] // 实际源码会处理空 deps 的特殊情况
  );

  // 9. 将实例和 create 函数存入 memoizedState（供更新阶段使用）
  hook.memoizedState = [inst, nextCreate];
}

// 更新阶段：更新 ImperativeHandle
function updateImperativeHandle(ref, create, deps) {
  // 1. 获取当前正在处理的 Hook 节点（更新阶段）
  const hook = updateWorkInProgressHook();

  // 2. 从 memoizedState 解构出之前保存的实例和 create 函数
  const [inst, nextCreate] = hook.memoizedState;

  // 3. 注册副作用：在依赖变化时更新 ref
  useEffect(
    () => {
      // 4. 执行 create 函数获取新实例
      const value = nextCreate();

      // 5. 仅当 ref 存在且值变化时更新（避免不必要的更新）
      if (ref && ref.current !== value) {
        ref.current = value;
      }
    },
    // 6. 依赖数组：当 deps 变化时重新执行 effect
    deps || []
  );
}
