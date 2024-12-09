export function generateRightTopTabPocket(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX + 3 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY + 0.5 * scaleY}
    L ${sidepocketX + 3 * scaleX},${sidepocketY + 0.5 * scaleY}
    Z
    M ${sidepocketX + 8 * scaleX},${sidepocketY}
    L ${sidepocketX + 9 * scaleX},${sidepocketY}
    L ${sidepocketX + 9 * scaleX},${sidepocketY + 1 * scaleY}
L ${sidepocketX + 8 * scaleX},${sidepocketY + 2 * scaleY}
L ${sidepocketX + 7 * scaleX},${sidepocketY + 1 * scaleY}
L ${sidepocketX + 7 * scaleX},${sidepocketY}
L ${sidepocketX + 8 * scaleX},${sidepocketY}
L ${sidepocketX + 8 * scaleX},${sidepocketY + 2 * scaleY}
  `
}
export function generateRightTopPocketPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX + 3 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX + 3 * scaleX},${sidepocketY + 4 * scaleY}
    Z
  `
}
export function generateRightTopPocketweltPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX + 3 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY + 1 * scaleY}
    L ${sidepocketX + 3 * scaleX},${sidepocketY + 1 * scaleY}
    Z
  `
}
export function generateRightTopPocketButtonPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const middleX = sidepocketX + 8 * scaleX
  const middleY = sidepocketY + 3 * scaleY
  const pocketPath = `
    M ${sidepocketX + 3 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY}
    L ${sidepocketX + 13 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX + 3 * scaleX},${sidepocketY + 4 * scaleY}
    Z
  `
  let radius = 2
  const circlePath = `M ${middleX},${middleY - 2 * scaleY}L ${middleX},${middleY}
  m -${radius},0
  a ${radius},${radius} 0 1,0 ${radius * 2},0
  a ${radius},${radius} 0 1,0 -${radius * 2},0
`
  return pocketPath + circlePath
}
