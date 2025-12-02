//TODO:OK
// use Hook 是 React 19 中引入的革命性特性，它不仅仅是一个新的 Hook，
// 更是 React 异步编程范式的重大突破。它将 Promise 和 Context 的消费统一到一个简洁的 API 中，
// 并与 Suspense 深度集成，为开发者提供了前所未有的异步数据获取体验。

function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // 🎯 一行代码搞定！

  return <div>Hello, {user.name}!</div>;
}

// 配合 Suspense 和 ErrorBoundary
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userId={123} />
      </Suspense>
    </ErrorBoundary>
  );
}

// use Hook 的核心理念是将异步资源（Promise）和同步资源（Context）统一抽象为 Usable

// use的入参是： type Usable<T> = Thenable<T> | ReactContext<T>;
// Thenable或者Context
// use接收到Promise,我们接收到Promise转化成Thenable提供内部使用

//1.正常流程对应 render 阶段
//2.遇到 use，进入挂起流程
//3.进入挂起流程对应 render 阶段
//4.进入挂起流程对应的 commit 阶段(渲染 loading)
//5.请求返回后，进入正常流程对应的 render 阶段
//6.进入正常流程对应的 commit 阶段(渲染 Cpn)

// Suspense 涉及到 render 阶段的一个新流程--unwind 流程
// 总结 render 阶段的三个流程
// beginWork:往下深度优先遍历
// completeWork:往上深度优先遍历
// unwind:往上遍历祖辈:找到离着最近的suspense，从这个suspense再开始beiginwork
// unwind 流程：Suspense 需要、ErrorBoundary 也需要

// 接收到Promise,我们接收到Promise转化成Thenable提供内部使用
// use 可以接受的数据类型是 Thenable(promise)、ReactContext
// use 会抛出一个 SuspenseException 会打断当前的render流程

// 开始render阶段 -> 遇到use(PENDING) -> use抛出SuspenseException -> unwind流程 -> 找到最近的Suspense -> 进入Suspense的fallback分支 -> commit阶段渲染loading界面
// use中Promise状态变成FULLFILLED -> 触发更新 -> 开始render阶段 -> commit阶段渲染Cpn界面
