export const calculateVest = (
  { length, shoulder, chest }: { length: number; shoulder: number; chest: number },
  containerWidth: number,
  containerHeight: number,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const startX = 80 * scaleX
  const startY = 30 * scaleY
  const shoulderEndX = startX + shoulder * scaleX
  const shoulderEndY = startY + 4 * scaleX
  const topSideX = startX + (chest * scaleX * 1) / 6 + (chest * scaleX * 1) / 8 + 2 * scaleX
  const topSideY = startY + length * scaleX - 35 * scaleX
  const lowerSideX = topSideX - scaleX
  const lowerSideY = startY + length * scaleX - 4 * scaleY
  const x5 = lowerSideX - (scaleX * chest) / 2
  const y5 = startY + length * scaleX
  const innerEdgeX = x5 - 4 * scaleX
  const bottomInnerEdgeY = startY + length * scaleX - 10 * scaleY
  const topInnerEdgeY = topSideY + 1 * scaleX

  const rightVestPath = `M ${startX},${startY} L ${shoulderEndX},${shoulderEndY}
      C ${shoulderEndX - (topSideX - shoulderEndX) / 1.875},${topSideY - (topSideY - shoulderEndY) / 4.5} ${shoulderEndX - (topSideX - shoulderEndX) / 1.25},${topSideY - (topSideY - shoulderEndY) / 27} ${topSideX},${topSideY}
      C ${lowerSideX - (topSideX - lowerSideX) / 0.5},${topSideY + (lowerSideY - topSideY) / 6.2} ${lowerSideX + (topSideX - lowerSideX) / 4},${topSideY + (lowerSideY - topSideY) / 1.4} ${lowerSideX},${lowerSideY}
      L ${x5},${y5}
      L ${innerEdgeX},${bottomInnerEdgeY}
      L ${innerEdgeX},${topInnerEdgeY}
      L ${startX},${startY}
    `
  const xRef = innerEdgeX + 2 * scaleX
  const leftVestPath = `M ${2 * xRef - startX},${startY} L ${2 * xRef - shoulderEndX},${shoulderEndY}
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
  const startPocketX = innerEdgeX + 9 * scaleX
  const startPocketY = bottomInnerEdgeY - 4 * scaleX
  const rightVestPocket = `M ${startPocketX},${startPocketY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 1.5 * scaleY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 3 * scaleY}
      L ${startPocketX},${startPocketY - 1.5 * scaleY}
      Z`

  const leftVestPocket = `M ${2 * xRef - startPocketX},${startPocketY}
      L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 1.5 * scaleY}
      L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 3 * scaleY}
      L ${2 * xRef - startPocketX},${startPocketY - 1.5 * scaleY}
      Z`

  const buttons = []
  const numButtons = 4
  const firstButton = bottomInnerEdgeY - 1 * scaleY
  const lastButton = topInnerEdgeY + 1 * scaleY
  const spacebetweenButtons = (lastButton - firstButton) / (numButtons - 1)
  for (let i = 0; i <= numButtons - 1; i++) {
    const yBoton = firstButton + i * spacebetweenButtons
    buttons.push({ cx: innerEdgeX + 1.5 * scaleX, cy: yBoton, r: 1 * scaleX })
  }
  const x1reflected = startX - 2 * (startX - innerEdgeX) + 4 * scaleX
  const curveControl1X = (startX + x1reflected) / 2
  const curveControl1Y = startY + 6 * scaleY
  const neck = `M ${startX},${startY} Q ${curveControl1X},${curveControl1Y} ${x1reflected},${startY} L${innerEdgeX},${topInnerEdgeY}`
  return {
    rightVestPath,
    leftVestPath,
    rightVestPocket,
    leftVestPocket,
    buttons,
    neck,
  }
}
