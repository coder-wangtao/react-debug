import { useEffect, useId, useState } from "react";

export default function App() {
  const [counter, setCounter] = useState(100);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCounter(counter - 1);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [counter]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCounter((i) => i - 1);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);

  return <div>{counter}</div>;
}
