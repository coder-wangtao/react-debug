const None = 0b0000; // 没有状态
const Pending = 0b0001; // 待处理
const InProgress = 0b0010; // 处理中
const Completed = 0b0100; // 已完成
const Failed = 0b1000; // 失败

let taskStatus = None;

//TODO:新增 标记任务为待处理
taskStatus |= Pending;
console.log(taskStatus.toString(2)); // 0001

//TODO:新增 同时标记为处理中
taskStatus |= InProgress;
console.log(taskStatus.toString(2)); // 0011

// 0011
// 0001
// 0001
//TODO:检查
if (taskStatus & Pending) {
  console.log("任务待处理");
}

// 0011
// 0100
// 0000
//TODO:检查
if (taskStatus & Completed) {
  console.log("任务已完成");
} else {
  console.log("任务未完成"); // 会输出
}

// 清除 Pending 状态
// Pending = 0001 => ~Pending = 1110

// 0011
// 1110
// 0010
//TODO:删除
taskStatus &= ~Pending;
console.log(taskStatus.toString(2)); // 0010（只剩 InProgress）

//TODO:翻转 翻转 Completed 状态 => 添加或移除状态。如果某一状态已经存在，就移除它；如果不存在，就添加它。
//0010
//0100
//0110
taskStatus ^= Completed;
console.log(taskStatus.toString(2)); // 0110

//TODO:获取最高优先级 最优先的任务 获取最低位的 1，也就是 二进制表示中最右边的 1，这通常用来获取 最优先的任务、标志位或通道。找到最右边的 1。
// -status 是一个非常重要的概念，特别是在 二进制运算 和 补码表示法 中。它代表的是 status 的负数，但是和普通的负数计算不同，它是通过补码来表示负数的。
// status = 0b0010 / -status = 0b0010 =取反=> 0b1101 =加1=> 0b1110

//0b101100  =取反=> 0b010011 =加1=> 0b010111
// 0b101100
// 0b010111
// 0b000100
function getHighestPriorityStatus(status) {
  return status & -status; // 获取最低位 1
}
