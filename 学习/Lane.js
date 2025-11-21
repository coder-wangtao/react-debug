const SyncLane = 0b0000000000000000000000000000001; // 第 1 位
const InputContinuousLane = 0b0000000000000000000000000000100; // 第 3 位
const DefaultLane = 0b0000000000000000000000010000000; // 第 8 位

// 组合多个 Lanes - 使用按位或(|)
const lanes = SyncLane | InputContinuousLane;
// lanes = 0b0000000000000000000000000000101

// 检查是否包含某个 Lane - 使用按位与(&)
const hasSyncLane = (lanes & SyncLane) !== 0; // true
const hasDefaultLane = (lanes & DefaultLane) !== 0; // false

// 移除某个 Lane - 使用按位与(&)和按位非(~)
const newLanes = lanes & ~InputContinuousLane;
// newLanes = 0b0000000000000000000000000000001
