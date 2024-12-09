export function generateRightZipPocketbackPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX - 3 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 8 * scaleY}
    L ${sidepocketX - 3 * scaleX},${sidepocketY + 8 * scaleY}
    Z
    M ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
    L${sidepocketX - 10 * scaleX},${sidepocketY}
  `
}
export function generateLeftZipPocketbackPath(
  innerWaist: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 8 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 8 * scaleY}
    Z
    M ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY}
  `
}
export function generateRightPocketbackPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX - 3 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4.5 * scaleY}
    L ${sidepocketX - 3 * scaleX},${sidepocketY + 4.5 * scaleY}
    Z
    M ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
    L${sidepocketX - 10 * scaleX},${sidepocketY}
  `
}
export function generateLeftPocketbackPath(
  innerWaist: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 4.5 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 4.5 * scaleY}
    Z
    M ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY}
  `
}
export function generateRightTabPocketbackPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX - 3 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4.5 * scaleY}
    L ${sidepocketX - 3 * scaleX},${sidepocketY + 4.5 * scaleY}
    Z
    M ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
    L${sidepocketX - 10 * scaleX},${sidepocketY}
    M ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 11 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 11 * scaleX},${sidepocketY + 5 * scaleY}
L ${sidepocketX - 10 * scaleX},${sidepocketY + 6 * scaleY}
L ${sidepocketX - 9 * scaleX},${sidepocketY + 5 * scaleY}
L ${sidepocketX - 9 * scaleX},${sidepocketY + 4 * scaleY}
L ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
L ${sidepocketX - 10 * scaleX},${sidepocketY + 6 * scaleY}
  `
}
export function generateLeftTabPocketbackPath(
  innerWaist: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 17 * scaleX)},${sidepocketY + 4.5 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 3 * scaleX)},${sidepocketY + 4.5 * scaleY}
    Z
    M ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY}
    M ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 11 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 11 * scaleX)},${sidepocketY + 5 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 6 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 9 * scaleX)},${sidepocketY + 5 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 9 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${2 * innerWaist - (sidepocketX - 10 * scaleX)},${sidepocketY + 6 * scaleY}
  `
}
export function generateRightZipPocketButtonbackPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const middleX = sidepocketX - 10 * scaleX
  const middleY = sidepocketY + 7 * scaleY
  const pocketPath = `
     M ${sidepocketX - 3 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 4 * scaleY}
    L ${sidepocketX - 17 * scaleX},${sidepocketY + 8 * scaleY}
    L ${sidepocketX - 3 * scaleX},${sidepocketY + 8 * scaleY}
    Z
    M ${sidepocketX - 10 * scaleX},${sidepocketY + 4 * scaleY}
    L${sidepocketX - 10 * scaleX},${sidepocketY}
  `
  let radius = 2
  const circlePath = `M ${middleX},${middleY - 2 * scaleY}L ${middleX},${middleY}
  m -${radius},0
  a ${radius},${radius} 0 1,0 ${radius * 2},0
  a ${radius},${radius} 0 1,0 -${radius * 2},0
`
  return pocketPath + circlePath
}
export function generateLeftZipPocketButtonbackPath(
  innerWaist: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const reflectedX = (originalX: number) => 2 * innerWaist - originalX

  const middleX = reflectedX(sidepocketX - 10 * scaleX)
  const middleY = sidepocketY + 7 * scaleY

  const pocketPath = `
    M ${reflectedX(sidepocketX - 3 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${reflectedX(sidepocketX - 17 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${reflectedX(sidepocketX - 17 * scaleX)},${sidepocketY + 8 * scaleY}
    L ${reflectedX(sidepocketX - 3 * scaleX)},${sidepocketY + 8 * scaleY}
    Z
    M ${reflectedX(sidepocketX - 10 * scaleX)},${sidepocketY + 4 * scaleY}
    L ${reflectedX(sidepocketX - 10 * scaleX)},${sidepocketY}
  `

  const radius = 2
  const circlePath = `
    M ${middleX},${middleY - 2 * scaleY}L ${middleX},${middleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `
  return pocketPath + circlePath
}
