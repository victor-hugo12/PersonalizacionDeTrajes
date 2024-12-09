export function generateRightTabPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const middleX = (startPocketX + startPocketX - 13 * scaleX) / 2
  const middleY = (startPocketY + startPocketY - 1.5 * scaleY) / 2
  const distance = 1 * scaleX
  const angle = Math.atan2(startPocketY - middleY, startPocketX - middleX)
  const offsetX = distance * Math.cos(angle)
  const offsetY = distance * Math.sin(angle)

  return `
  M ${startPocketX},${startPocketY}
    L ${startPocketX - 13 * scaleX},${startPocketY - 1.5 * scaleY}
    L ${startPocketX - 13 * scaleX},${startPocketY - 2 * scaleY}
    L ${startPocketX},${startPocketY - 0.5 * scaleY}
    Z
    M ${middleX},${middleY - 0.5 * scaleY}
    L ${middleX - offsetX},${middleY - offsetY - 0.5 * scaleY}
    L ${middleX - offsetX},${middleY - offsetY + 0.5 * scaleY}
    L ${middleX},${middleY - offsetY + 2 * scaleY}
    L ${middleX + offsetX},${middleY + offsetY + 0.5 * scaleY}
    L ${middleX + offsetX},${middleY + offsetY - 0.5 * scaleY}
    L ${middleX},${middleY - 0.5 * scaleY}
    L ${middleX},${middleY - offsetY + 2 * scaleY}
  `
}
export function generateLeftTabPocket(
  xRef: number,
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const mirroredStartPocketX = 2 * xRef - startPocketX
  const mirroredEndPocketX = 2 * xRef - (startPocketX - 13 * scaleX)

  const middleX = (mirroredStartPocketX + mirroredEndPocketX) / 2
  const middleY = (startPocketY + startPocketY - 1.5 * scaleY) / 2

  const distance = 1 * scaleX
  const angle = Math.atan2(startPocketY - middleY, mirroredStartPocketX - middleX)
  const offsetX = distance * Math.cos(angle)
  const offsetY = distance * Math.sin(angle)

  return `
    M ${mirroredStartPocketX},${startPocketY}
    L ${mirroredEndPocketX},${startPocketY - 1.5 * scaleY}
    L ${mirroredEndPocketX},${startPocketY - 2 * scaleY}
    L ${mirroredStartPocketX},${startPocketY - 0.5 * scaleY}
    Z
    M ${middleX},${middleY - 0.5 * scaleY}
    L ${middleX - offsetX},${middleY - offsetY - 0.5 * scaleY}
    L ${middleX - offsetX},${middleY - offsetY + 0.5 * scaleY}
    L ${middleX},${middleY - offsetY + 2 * scaleY}
    L ${middleX + offsetX},${middleY + offsetY + 0.5 * scaleY}
    L ${middleX + offsetX},${middleY + offsetY - 0.5 * scaleY}
    L ${middleX},${middleY - 0.5 * scaleY}
    L ${middleX},${middleY - offsetY + 2 * scaleY}
  `
}

export function generateRightWeltPocketPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX},${sidepocketY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 1.5 * scaleY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 2 * scaleY}
    L ${sidepocketX},${sidepocketY - 0.5 * scaleY}
    Z
  `
}
export function generateLeftWeltPocketPath(
  xRef: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${2 * xRef - sidepocketX},${sidepocketY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 1.5 * scaleY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 2 * scaleY}
    L ${2 * xRef - sidepocketX},${sidepocketY - 0.5 * scaleY}
    Z
  `
}
export function generateRightPocketWithButtonPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const pocketPath = `
    M ${sidepocketX},${sidepocketY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 1.5 * scaleY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 6 * scaleY}
    L ${sidepocketX},${sidepocketY - 4.5 * scaleY}
    Z
  `

  const middleX = sidepocketX - 6.5 * scaleX
  const middleY = sidepocketY - 3 * scaleY
  const radius = 1 * scaleX

  const circlePath = `
    M ${middleX},${middleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `

  return pocketPath + circlePath
}
export function generateLeftPocketWithButtonPath(
  xRef: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const pocketPath = `
    M ${2 * xRef - sidepocketX},${sidepocketY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 1.5 * scaleY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 6 * scaleY}
    L ${2 * xRef - sidepocketX},${sidepocketY - 4.5 * scaleY}
    Z
  `
  const mirroredMiddleX = 2 * xRef - (sidepocketX - 6.5 * scaleX)
  const middleY = sidepocketY - 3 * scaleY
  const radius = 1 * scaleX

  const circlePath = `
    M ${mirroredMiddleX},${middleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `

  return pocketPath + circlePath
}

export function generateRightPocketPath(
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${sidepocketX},${sidepocketY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 1.5 * scaleY}
    L ${sidepocketX - 13 * scaleX},${sidepocketY - 6 * scaleY}
    L ${sidepocketX},${sidepocketY - 4.5 * scaleY}
    Z
  `
}

export function generateLeftPocketPath(
  xRef: number,
  sidepocketX: number,
  sidepocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
    M ${2 * xRef - sidepocketX},${sidepocketY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 1.5 * scaleY}
    L ${2 * xRef - (sidepocketX - 13 * scaleX)},${sidepocketY - 6 * scaleY}
    L ${2 * xRef - sidepocketX},${sidepocketY - 4.5 * scaleY}
    Z
  `
}
