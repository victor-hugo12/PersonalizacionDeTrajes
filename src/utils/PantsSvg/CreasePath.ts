export function generateRightCreasePath(
  innerWaist: number,
  startY: number,
  innerThigh: number,
  thighY: number,
  scaleX: number,
  scaleY: number,
  lineCount: number,
): string {
  innerWaist = innerWaist + 6 * scaleX
  innerThigh = innerThigh + 6 * scaleX
  thighY = thighY - 4 * scaleY
  let path = ``
  if (lineCount > 0) {
    path = `M ${innerWaist},${startY} L ${innerThigh},${thighY}`
    for (let i = 1; i <= lineCount - 1; i++) {
      const offset = i * 4 * scaleX
      const lineStartX = innerWaist + offset
      const lineEndX = innerThigh + offset
      path += ` M ${lineEndX},${thighY}L ${lineStartX + 1 * scaleX},${startY}L ${lineEndX + 2 * scaleX},${thighY}`
    }
  }
  return path
}
export function generateLeftCreasePath(
  innerWaist: number,
  startY: number,
  innerThigh: number,
  thighY: number,
  scaleX: number,
  scaleY: number,
  lineCount: number,
): string {
  innerWaist = innerWaist - 6 * scaleX
  innerThigh = innerThigh - 6 * scaleX
  thighY = thighY - 4 * scaleY
  let path = ``
  if (lineCount > 0) {
    path = `M ${innerWaist},${startY} L ${innerThigh},${thighY}`
    for (let i = 1; i <= lineCount - 1; i++) {
      const offset = i * 4 * scaleX
      const lineStartX = innerWaist - offset
      const lineEndX = innerThigh - offset
      path += ` M ${lineEndX},${thighY} L ${lineStartX - scaleX},${startY} L ${lineEndX - 2 * scaleX},${thighY}`
    }
  }

  return path
}
