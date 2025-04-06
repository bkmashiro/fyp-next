/**
 * 将四元数转换为欧拉角（弧度）
 * @param q 四元数 [x, y, z, w]
 * @returns 欧拉角 [x, y, z]（弧度）
 */
export function quaternionToEuler(q: number[]): [number, number, number] {
  const [x, y, z, w] = q

  // 计算欧拉角
  const roll = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y))
  const pitch = Math.asin(2 * (w * y - z * x))
  const yaw = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z))

  return [roll, pitch, yaw]
}

/**
 * 将弧度转换为角度
 * @param rad 弧度
 * @returns 角度
 */
export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI
}

/**
 * 将欧拉角（弧度）转换为欧拉角（角度）
 * @param euler 欧拉角 [x, y, z]（弧度）
 * @returns 欧拉角 [x, y, z]（角度）
 */
export function eulerRadToDeg(euler: [number, number, number]): [number, number, number] {
  return euler.map(radToDeg) as [number, number, number]
}

/**
 * 格式化角度显示
 * @param deg 角度
 * @returns 格式化后的角度字符串
 */
export function formatDegree(deg: number): string {
  return `${deg.toFixed(2)}°`
} 