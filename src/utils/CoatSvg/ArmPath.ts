export function generateRightArmPath(
  shoulderendX: number,
  shoulderendY: number,
  endArmX1: number,
  endArmY1: number,
  endArmX2: number,
  endArmY2: number,
  armBaseX: number,
  armBaseY: number,
): string {
  return `
    M ${shoulderendX},${shoulderendY}
    Q ${shoulderendX + (endArmX1 - shoulderendX) / 1.2},${shoulderendY + (endArmY1 - shoulderendY) / 2.25} ${endArmX1},${endArmY1}
    L ${endArmX2},${endArmY2}
    Q ${armBaseX + (endArmX2 - armBaseX) / 1.2},${armBaseY + (endArmY2 - armBaseY) / 2.25} ${armBaseX},${armBaseY}
  `
}

export function generateLeftArmPath(
  xRef: number,
  shoulderendX: number,
  shoulderendY: number,
  endArmX1: number,
  endArmY1: number,
  endArmX2: number,
  endArmY2: number,
  armBaseX: number,
  armBaseY: number,
): string {
  return `
    M ${2 * xRef - shoulderendX},${shoulderendY}
    Q ${2 * xRef - (shoulderendX + (endArmX1 - shoulderendX) / 1.2)},${shoulderendY + (endArmY1 - shoulderendY) / 2.25} ${2 * xRef - endArmX1},${endArmY1}
    L ${2 * xRef - endArmX2},${endArmY2}
    Q ${2 * xRef - (armBaseX + (endArmX2 - armBaseX) / 1.2)},${armBaseY + (endArmY2 - armBaseY) / 2.25} ${2 * xRef - armBaseX},${armBaseY}
  `
}
