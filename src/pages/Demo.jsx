import { useState } from "react";
import ReactDemo from "react-dom";

function Demo() {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <input onChange={handleChange} />
      {Array(1000)
        .fill("a")
        .map((item) => (
          <div>{value}</div>
        ))}
    </div>
  );
}

export default Demo;
