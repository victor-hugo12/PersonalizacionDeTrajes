export const calculateCoat = (
  {
    length,
    shoulder,
    chest,
    arm,
  }: {
    length: number
    shoulder: number
    chest: number
    arm: number
  },
  containerWidth: number,
  containerHeight: number,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const startX = 80 * scaleX
  const startY = 30 * scaleY
  const shoulderendX = startX + shoulder * scaleX
  const shoulderendY = startY + 4 * scaleX
  const sideCurveStartX = startX + (chest * scaleX) / 6 + (chest * scaleX) / 8 + 6 * scaleX
  const sideCurveStartY = startY + (scaleY * length) / 3
  const sideCurveEndX = sideCurveStartX - scaleX
  const sideCurveEndY = startY + length * scaleY
  const bottomEdgeX = sideCurveEndX - (scaleX * chest) / 2 + 4 * scaleX
  const bottomEdgeY = startY + length * scaleY
  const innerEdgeX = bottomEdgeX - 9 * scaleX
  const bottomInnerEdgeY = startY + length * scaleY - 10 * scaleX
  const topInnerEdgeY = startY + (scaleY * length) / 2

  const rightCoatPath = `M ${startX},${startY} L ${shoulderendX},${shoulderendY}
      Q ${shoulderendX + (sideCurveStartX - shoulderendX) / 1.75},${shoulderendY + (sideCurveStartY - shoulderendY) / 1.2}  ${sideCurveStartX},${sideCurveStartY}
      C ${sideCurveEndX - (sideCurveStartX - sideCurveEndX) / 0.5},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 6.2} ${sideCurveEndX + (sideCurveStartX - sideCurveEndX) / 4},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 1.4} ${sideCurveEndX},${sideCurveEndY}
      L ${bottomEdgeX},${bottomEdgeY}
      Q ${bottomEdgeX - (bottomEdgeX - innerEdgeX) / 1.3},${bottomEdgeY - (bottomEdgeY - bottomInnerEdgeY) / 5} ${innerEdgeX},${bottomInnerEdgeY}
      L ${innerEdgeX},${topInnerEdgeY}
      L ${startX},${startY}
      `
  const xRef = innerEdgeX + 2 * scaleX
  const leftCoatPath = `
        M ${2 * xRef - startX},${startY}
        L ${2 * xRef - shoulderendX},${shoulderendY}
        Q ${2 * xRef - (shoulderendX + (sideCurveStartX - shoulderendX) / 1.75)},${shoulderendY + (sideCurveStartY - shoulderendY) / 1.2}
          ${2 * xRef - sideCurveStartX},${sideCurveStartY}
        C ${2 * xRef - (sideCurveEndX - (sideCurveStartX - sideCurveEndX) / 0.5)},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 6.2}
          ${2 * xRef - (sideCurveEndX + (sideCurveStartX - sideCurveEndX) / 4)},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 1.4}
          ${2 * xRef - sideCurveEndX},${sideCurveEndY}
        L ${2 * xRef - bottomEdgeX},${bottomEdgeY}
        Q ${2 * xRef - (bottomEdgeX - (bottomEdgeX - innerEdgeX) / 1.3)},${bottomEdgeY - (bottomEdgeY - bottomInnerEdgeY) / 5}
          ${2 * xRef - innerEdgeX},${bottomInnerEdgeY}
        L ${2 * xRef - innerEdgeX},${topInnerEdgeY}
        L ${2 * xRef - startX},${startY}
      `
  const sidepocketX = sideCurveEndX
  const sidepocketY = bottomInnerEdgeY - 4 * scaleY

  const rightPocket = `M ${sidepocketX},${sidepocketY}
      L ${sidepocketX - 13 * scaleX},${sidepocketY - 1.5 * scaleY}
      L ${sidepocketX - 13 * scaleX},${sidepocketY - 6 * scaleY}
      L ${sidepocketX},${sidepocketY - 4.5 * scaleY}
      Z`
  const leftPocket = `M ${2 * xRef - sidepocketX},${sidepocketY}
  L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 1.5 * scaleY}
  L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 6 * scaleY}
  L ${2 * xRef - sidepocketX},${sidepocketY - 4.5 * scaleY}
  Z
`
  const buttons = []
  const numButtons = 2
  const firstButton = bottomInnerEdgeY - 4 * scaleY
  const lastButton = topInnerEdgeY + 4 * scaleY
  const spacebetweenButtons = (lastButton - firstButton) / (numButtons - 1)
  for (let i = 0; i <= numButtons - 1; i++) {
    const yBoton = firstButton + i * spacebetweenButtons
    buttons.push({ cx: innerEdgeX + 1.5 * scaleX, cy: yBoton, r: 1 * scaleX })
  }
  const startXreflected = startX - 2 * (startX - innerEdgeX) + 4 * scaleX
  const curveControl1X = (startX + startXreflected) / 2
  const curveControl1Y = startY - 2 * scaleY
  const neck = `M ${startX},${startY} Q ${curveControl1X},${curveControl1Y} ${startXreflected},${startY}
                      L ${startXreflected},${startY - 4 * scaleY} Q ${curveControl1X},${curveControl1Y - 4 * scaleY} ${startX},${startY - 4 * scaleY}
                      M ${startX},${startY} Q ${curveControl1X},${curveControl1Y} ${startXreflected},${startY} L ${innerEdgeX} ${topInnerEdgeY}
                      `
  const neckx1 = innerEdgeX + (5 / 6) * (startX - innerEdgeX)
  const necky1 = topInnerEdgeY + (5 / 6) * (startY - topInnerEdgeY)
  const rightRoundNeck = `M ${innerEdgeX},${topInnerEdgeY} L ${neckx1 + 3 * scaleX},${necky1 + 3 * scaleY}
      L ${neckx1},${necky1} z
         M ${neckx1},${necky1} L ${neckx1 + 4 * scaleX},${necky1}
         L ${startX},${startY - 4 * scaleY} z
      `
  const leftRoundNeck = `
  M ${2 * xRef - innerEdgeX},${topInnerEdgeY}
  L ${2 * xRef - (neckx1 + 3 * scaleY)},${necky1 + 3 * scaleY}
  L ${2 * xRef - neckx1},${necky1} z
  M ${2 * xRef - neckx1},${necky1}
  L ${2 * xRef - (neckx1 + 4 * scaleY)},${necky1}
  L ${2 * xRef - startX},${startY - 4 * scaleY} z
`
  const endArmX1 = sideCurveStartX + 14 * scaleX
  const endArmY1 = shoulderendY + arm * scaleX
  const endArmX2 = endArmX1 - 12 * scaleX
  const endArmY2 = shoulderendY + arm * scaleX + 4 * scaleX
  const armBaseX = shoulderendX - 12 * scaleX
  const armBaseY = shoulderendY + 4 * scaleX
  const rightArm = `M ${shoulderendX},${shoulderendY} Q ${shoulderendX + (endArmX1 - shoulderendX) / 1.2},${shoulderendY + (endArmY1 - shoulderendY) / 2.25} ${endArmX1},${endArmY1}
          L ${endArmX2},${endArmY2}
          Q ${armBaseX + (endArmX2 - armBaseX) / 1.2},${armBaseY + (endArmY2 - armBaseY) / 2.25} ${armBaseX},${armBaseY}
      `
  const leftArmMirrored = `
  M ${2 * xRef - shoulderendX},${shoulderendY}
  Q ${2 * xRef - (shoulderendX + (endArmX1 - shoulderendX) / 1.2)},${shoulderendY + (endArmY1 - shoulderendY) / 2.25}
    ${2 * xRef - endArmX1},${endArmY1}
  L ${2 * xRef - endArmX2},${endArmY2}
  Q ${2 * xRef - (armBaseX + (endArmX2 - armBaseX) / 1.2)},${armBaseY + (endArmY2 - armBaseY) / 2.25}
    ${2 * xRef - armBaseX},${armBaseY}
`

  return {
    rightCoatPath,
    leftCoatPath,
    rightPocket,
    leftPocket,
    buttons,
    neck,
    rightRoundNeck,
    leftRoundNeck,
    rightArm,
    leftArmMirrored,
  }
}
