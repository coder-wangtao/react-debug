import { useState } from "react";

function App() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      const res = await updateData(name);
    } catch (error) {
      setError(error.message);
    }
    setIsPending(false);
  };
}
