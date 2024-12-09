export function generateRightCoatPath(
  startX: number,
  startY: number,
  shoulderendX: number,
  shoulderendY: number,
  sideCurveStartX: number,
  sideCurveEndX: number,
  sideCurveStartY: number,
  sideCurveEndY: number,
  bottomEdgeX: number,
  bottomEdgeY: number,
  innerEdgeX: number,
  bottomInnerEdgeY: number,
  topInnerEdgeY: number,
): string {
  return `M ${startX},${startY} L ${shoulderendX},${shoulderendY}
      Q ${shoulderendX + (sideCurveStartX - shoulderendX) / 1.75},${shoulderendY + (sideCurveStartY - shoulderendY) / 1.2}  ${sideCurveStartX},${sideCurveStartY}
      C ${sideCurveEndX - (sideCurveStartX - sideCurveEndX) / 0.5},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 6.2} ${sideCurveEndX + (sideCurveStartX - sideCurveEndX) / 4},${sideCurveStartY + (sideCurveEndY - sideCurveStartY) / 1.4} ${sideCurveEndX},${sideCurveEndY}
      L ${bottomEdgeX},${bottomEdgeY}
      Q ${bottomEdgeX - (bottomEdgeX - innerEdgeX) / 1.3},${bottomEdgeY - (bottomEdgeY - bottomInnerEdgeY) / 5} ${innerEdgeX},${bottomInnerEdgeY}
      L ${innerEdgeX},${topInnerEdgeY}
      L ${startX},${startY}`
}

export function generateLeftCoatPath(
  xRef: number,
  startX: number,
  startY: number,
  shoulderendX: number,
  shoulderendY: number,
  sideCurveStartX: number,
  sideCurveEndX: number,
  sideCurveStartY: number,
  sideCurveEndY: number,
  bottomEdgeX: number,
  bottomEdgeY: number,
  innerEdgeX: number,
  bottomInnerEdgeY: number,
  topInnerEdgeY: number,
): string {
  return `
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
}
