import { startTransition, useActionState, useState } from "react";

function App() {
  const updateData = (name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(name);
      }, 1000);
    });
  };
  const [state, handleSubmit, isPending] = useActionState(
    async (prevState, formDate) => {
      try {
        const res = await updateData(formDate.get("name1"));
        return res;
      } catch (error) {
        return error.message;
      }
    },
    "初始化"
  );

  return (
    <form action={handleSubmit}>
      <input name="name1" />
      <button disabled={isPending} type="submit">
        提交
      </button>
      <h1>{state}</h1>
    </form>
  );
}

export default App;
