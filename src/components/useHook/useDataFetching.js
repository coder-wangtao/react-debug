import { useState, useEffect } from "react";

const useDataFetching = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟异步获取数据
    setTimeout(() => {
      setData({ id: 1, name: "Example Data" });
      setLoading(false);
    }, 2000);
  }, []);

  return { data, loading };
};

export default useDataFetching;
