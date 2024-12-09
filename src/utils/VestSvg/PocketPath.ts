export function generateLeftVestTabPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
  xRef: number,
): string {
  const middleX = (2 * xRef - startPocketX + 2 * xRef - (startPocketX + 13 * scaleX)) / 2
  const middleY = (startPocketY + startPocketY - 4 * scaleY) / 2
  const distance = 1 * scaleX
  const angle = Math.atan2(startPocketY - middleY, startPocketX - middleX)
  const offsetX = distance * Math.cos(angle)
  const offsetY = distance * Math.sin(angle)

  return `
    M ${2 * xRef - startPocketX},${startPocketY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4 * scaleY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4.5 * scaleY}
    L ${2 * xRef - startPocketX},${startPocketY - 0.5 * scaleY}
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
export function generateRightVestTabPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const middleX = (startPocketX + startPocketX + 13 * scaleX) / 2
  const middleY = (startPocketY + startPocketY - 4 * scaleY) / 2
  const distance = 1 * scaleX
  const angle = Math.atan2(startPocketY - middleY, startPocketX - middleX)
  const offsetX = distance * Math.cos(angle)
  const offsetY = distance * Math.sin(angle)

  return `
  M ${startPocketX},${startPocketY}
    L ${startPocketX + 13 * scaleX},${startPocketY - 4 * scaleY}
    L ${startPocketX + 13 * scaleX},${startPocketY - 4.5 * scaleY}
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
export function generateLeftVestWeltPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
  xRef: number,
): string {
  return `
    M ${2 * xRef - startPocketX},${startPocketY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4 * scaleY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4.5 * scaleY}
    L ${2 * xRef - startPocketX},${startPocketY - 0.5 * scaleY}
    Z

  `
}
export function generateRightVestWeltPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `
  M ${startPocketX},${startPocketY}
    L ${startPocketX + 13 * scaleX},${startPocketY - 4 * scaleY}
    L ${startPocketX + 13 * scaleX},${startPocketY - 4.5 * scaleY}
    L ${startPocketX},${startPocketY - 0.5 * scaleY}
    Z

  `
}
export function generateRightPocketWithButtonPath(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  const pocketPath = `
   M ${startPocketX},${startPocketY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 4 * scaleY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 8.5 * scaleY}
      L ${startPocketX},${startPocketY - 4.5 * scaleY}
      Z
  `

  const middleX = startPocketX + 6.5 * scaleX
  const middleY = startPocketY - 3 * scaleY
  const radius = 1 * scaleX

  const circlePath = `
    M ${middleX},${middleY - 2 * scaleY}L ${middleX},${middleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `

  return pocketPath + circlePath
}
export function generateLeftPocketWithButtonPath(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
  xRef: number,
): string {
  const pocketPath = `
    M ${2 * xRef - startPocketX},${startPocketY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4 * scaleY}
    L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 8.5 * scaleY}
    L ${2 * xRef - startPocketX},${startPocketY - 4.5 * scaleY}
    Z
  `

  const middleX = 2 * xRef - (startPocketX + 6.5 * scaleX)
  const middleY = startPocketY - 3 * scaleY
  const radius = 1 * scaleX

  const circlePath = `
    M ${middleX},${middleY - 2 * scaleY}L ${middleX},${middleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `

  return pocketPath + circlePath
}

export function generateRightVestPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
): string {
  return `M ${startPocketX},${startPocketY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 4 * scaleY}
      L ${startPocketX + 13 * scaleX},${startPocketY - 8.5 * scaleY}
      L ${startPocketX},${startPocketY - 4.5 * scaleY}
      Z`
}
export function generateLeftVestPocket(
  startPocketX: number,
  startPocketY: number,
  scaleX: number,
  scaleY: number,
  xRef: number,
): string {
  return `M ${2 * xRef - startPocketX},${startPocketY}
      L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 4 * scaleY}
      L ${2 * xRef - (startPocketX + 13 * scaleX)},${startPocketY - 8.5 * scaleY}
      L ${2 * xRef - startPocketX},${startPocketY - 4.5 * scaleY}
      Z`
}
