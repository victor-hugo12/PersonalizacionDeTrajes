export function generateZipNeckPath(
  startX: number,
  startY: number,
  curveControl1X: number,
  curveControl1Y: number,
  startXreflected: number,
  scaleY: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${startX},${startY}
    Q ${curveControl1X},${curveControl1Y} ${startXreflected},${startY}
    L ${startXreflected},${startY - 4 * scaleY}
    Q ${curveControl1X},${curveControl1Y - 4 * scaleY} ${startX},${startY - 4 * scaleY}
    M ${startX},${startY}
    Q ${curveControl1X},${curveControl1Y} ${startXreflected},${startY}
    L ${innerEdgeX},${topInnerEdgeY}
  `
}
export function generateNeckPath(
  startX: number,
  startY: number,
  curveControl1X: number,
  curveControl1Y: number,
  startXreflected: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `

    M ${startX},${startY}
    Q ${curveControl1X},${curveControl1Y} ${startXreflected},${startY}
    L ${innerEdgeX},${topInnerEdgeY}
  `
}

export function generateRightRoundZipNeckPath(
  neckx1: number,
  necky1: number,
  scaleX: number,
  scaleY: number,
  startX: number,
  startY: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${innerEdgeX},${topInnerEdgeY}
    L ${neckx1 + 3 * scaleX},${necky1 + 3 * scaleY}
    L ${neckx1},${necky1} z
    M ${neckx1},${necky1}
    L ${neckx1 + 4 * scaleX},${necky1}
    L ${startX},${startY - 4 * scaleY} z
  `
}
export function generateLeftRoundZipNeckPath(
  xRef: number,
  neckx1: number,
  necky1: number,
  scaleX: number,
  scaleY: number,
  startX: number,
  startY: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${2 * xRef - innerEdgeX},${topInnerEdgeY}
    L ${2 * xRef - (neckx1 + 3 * scaleX)},${necky1 + 3 * scaleY}
    L ${2 * xRef - neckx1},${necky1} z
    M ${2 * xRef - neckx1},${necky1}
    L ${2 * xRef - (neckx1 + 4 * scaleX)},${necky1}
    L ${2 * xRef - startX},${startY - 4 * scaleY} z
  `
}
export function generateLeftRoundNeckPath(
  xRef: number,
  neckx1: number,
  necky1: number,
  scaleX: number,
  scaleY: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${2 * xRef - innerEdgeX},${topInnerEdgeY}
    L ${2 * xRef - (neckx1 + 3 * scaleX)},${necky1 + 3 * scaleY}
    L ${2 * xRef - neckx1},${necky1} z

  `
}
export function generateRightRoundNeckPath(
  neckx1: number,
  necky1: number,
  scaleX: number,
  scaleY: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${innerEdgeX},${topInnerEdgeY}
    L ${neckx1 + 3 * scaleX},${necky1 + 3 * scaleY}
    L ${neckx1},${necky1} z

  `
}
export function generateLeftRoundCircularNeckPath(
  xRef: number,
  neckx1: number,
  necky1: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${2 * xRef - neckx1},${necky1}
    C ${2 * xRef - (neckx1 + (neckx1 - innerEdgeX) / 1)},${necky1 + (topInnerEdgeY - necky1) / 8}
      ${2 * xRef - (neckx1 - (neckx1 - innerEdgeX) / 2.5)},${necky1 + (topInnerEdgeY - necky1) / 1.25}
      ${2 * xRef - innerEdgeX},${topInnerEdgeY}
  `
}

export function generateRightRoundCircularNeckPath(
  neckx1: number,
  necky1: number,
  innerEdgeX: number,
  topInnerEdgeY: number,
): string {
  return `
    M ${neckx1},${necky1}
    C ${neckx1 + (neckx1 - innerEdgeX) / 1},${necky1 + (topInnerEdgeY - necky1) / 8}
      ${neckx1 - (neckx1 - innerEdgeX) / 2.5},${necky1 + (topInnerEdgeY - necky1) / 1.25}
      ${innerEdgeX},${topInnerEdgeY}`
}
