export function generateClosurePath(
  innerWaist: number,
  startY: number,
  innerThigh: number,
  thighY: number,
  scaleX: number,
  scaleY: number,
): string {
  innerWaist = innerWaist + 3 * scaleX
  startY = startY - 4 * scaleY
  return `M ${innerWaist},${startY}
          C ${innerWaist + (innerWaist - innerThigh) / 5},${startY + (thighY - startY) / 1.3} ${innerWaist - (innerWaist - innerThigh) / 1.8},${startY + (thighY - startY) / 1} ${innerThigh},${thighY}`
}
export function generateClosureButtonPath(
  innerWaist: number,
  startY: number,
  innerThigh: number,
  thighY: number,
  scaleX: number,
  scaleY: number,
): string {
  innerWaist = innerWaist + 3 * scaleX
  startY = startY - 4 * scaleY
  const circleX = innerWaist - 1.5 * scaleX
  const circleY = startY + 1.5 * scaleX
  const radius = 1 * scaleX
  return `
    M ${innerWaist},${startY}
    C ${innerWaist + (innerWaist - innerThigh) / 5},${startY + (thighY - startY) / 1.3}
      ${innerWaist - (innerWaist - innerThigh) / 1.8},${startY + (thighY - startY) / 1}
      ${innerThigh},${thighY}
    M ${circleX},${circleY}
    m -${radius},0
    a ${radius},${radius} 0 1,0 ${radius * 2},0
    a ${radius},${radius} 0 1,0 -${radius * 2},0
  `
}
