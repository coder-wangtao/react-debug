import React, { useState, useTransition } from "react";
import "./index.css";

const FilterList = () => {
  const [query, setQuery] = useState(""); // 输入框的查询条件
  const [filteredItems, setFilteredItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  // 模拟一个较大的数据列表
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

  const handleFilter = (e) => {
    const value = e.target.value;
    setQuery(value);

    // 使用 startTransition 来将更新任务标记为并发任务
    startTransition(() => {
      const filtered = items.filter((item) => item.includes(value));
      setFilteredItems(filtered);
    });
    // const filtered = items.filter((item) => item.includes(value));
    // setFilteredItems(filtered);
  };

  return (
    <div>
      <h2>并发模式测试组件</h2>
      <div className="spinner" />
      <input
        type="text"
        value={query}
        onChange={handleFilter}
        placeholder="输入关键字筛选列表..."
      />
      {isPending ? <p>筛选中...</p> : null}
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilterList;
