import { useFormStatus } from "react-dom";

function Submit() {
  const { pending, data, method, action } = useFormStatus();
  console.log(pending, data, method, action);
  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中" : "提交"}
    </button>
  );
}

function Form({ action }) {
  return (
    <form action={action}>
      <input type="text" name="message" />
      <Submit />
    </form>
  );
}

async function submitForm() {
  await new Promise((res) => setTimeout(res, 1000));
}

function App() {
  return <Form action={submitForm} />;
}

export default App;
