// Redux 简易实现
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  dispatch({ type: "@@redux/INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default createStore(counterReducer, { count: 0 });
