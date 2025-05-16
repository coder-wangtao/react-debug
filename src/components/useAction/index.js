import { startTransition, useActionState, useState } from "react";

function App() {
  const [name, setName] = useState("");

  const updateData = (name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(name);
      }, 1000);
    });
  };

  const [state, handleSubmit, isPending] = useActionState(
    async (prevState, name) => {
      try {
        const res = await updateData(name);
        return res;
      } catch (error) {
        return error.message;
      }
    },
    "初始化"
  );

  return (
    <div>
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            handleSubmit(name);
          });
        }}
      >
        提交
      </button>
      <h1>{state}</h1>
    </div>
  );
}

export default App;
