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
