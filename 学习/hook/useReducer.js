//TODO:OK
// 区分为初始化和更新。初始化，在我们第一次进行调度时，检测到是函数组件，调用renderWithHooks，执行useReducer，调用mountReducer操作，将传入的初始值挂载到fiber的memoizedState,

// 更新的时候，dispatch会去触发scheduleUpdateOnFiber，进入调度，再次进到renderWithHooks,执行updateReducer，得到新的state值返回，并重新计算渲染。
