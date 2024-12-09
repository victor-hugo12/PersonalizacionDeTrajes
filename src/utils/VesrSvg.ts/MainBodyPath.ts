export function generateRightVestPath(
  startX: number,
  startY: number,
  shoulderEndX: number,
  shoulderEndY: number,
  topSideX: number,
  topSideY: number,
  lowerSideX: number,
  lowerSideY: number,
  x5: number,
  y5: number,
  innerEdgeX: number,
  bottomInnerEdgeY: number,
  topInnerEdgeY: number,
): string {
  return `M ${startX},${startY}
      L ${shoulderEndX},${shoulderEndY}
      C ${shoulderEndX - (topSideX - shoulderEndX) / 1.875},${topSideY - (topSideY - shoulderEndY) / 4.5}
        ${shoulderEndX - (topSideX - shoulderEndX) / 1.25},${topSideY - (topSideY - shoulderEndY) / 27}
        ${topSideX},${topSideY}
      C ${lowerSideX - (topSideX - lowerSideX) / 0.5},${topSideY + (lowerSideY - topSideY) / 6.2}
        ${lowerSideX + (topSideX - lowerSideX) / 4},${topSideY + (lowerSideY - topSideY) / 1.4}
        ${lowerSideX},${lowerSideY}
      L ${x5},${y5}
      L ${innerEdgeX},${bottomInnerEdgeY}
      L ${innerEdgeX},${topInnerEdgeY}
      L ${startX},${startY}`
}
export function generateLeftVestPath(
  startX: number,
  startY: number,
  shoulderEndX: number,
  shoulderEndY: number,
  topSideX: number,
  topSideY: number,
  lowerSideX: number,
  lowerSideY: number,
  x5: number,
  y5: number,
  innerEdgeX: number,
  bottomInnerEdgeY: number,
  topInnerEdgeY: number,
  xRef: number,
): string {
  return `M ${2 * xRef - startX},${startY}
      L ${2 * xRef - shoulderEndX},${shoulderEndY}
      C ${2 * xRef - (shoulderEndX - (topSideX - shoulderEndX) / 1.875)},${topSideY - (topSideY - shoulderEndY) / 4.5}
        ${2 * xRef - (shoulderEndX - (topSideX - shoulderEndX) / 1.25)},${topSideY - (topSideY - shoulderEndY) / 27}
        ${2 * xRef - topSideX},${topSideY}
      C ${2 * xRef - (lowerSideX - (topSideX - lowerSideX) / 0.5)},${topSideY + (lowerSideY - topSideY) / 6.2}
        ${2 * xRef - (lowerSideX + (topSideX - lowerSideX) / 4)},${topSideY + (lowerSideY - topSideY) / 1.4}
        ${2 * xRef - lowerSideX},${lowerSideY}
      L ${2 * xRef - x5},${y5}
      L ${2 * xRef - innerEdgeX},${bottomInnerEdgeY}
      L ${2 * xRef - innerEdgeX},${topInnerEdgeY}
      L ${2 * xRef - startX},${startY}`
}
