export function generateWaistbandPaths(
  startX: number,
  startY: number,
  innerWaist: number,
  scaleX: number,
  scaleY: number,
): { rightWaist: string; leftWaist: string } {
  const generateRectangle = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ): string => {
    return `M ${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} z`
  }
  const rightWaist = [
    generateRectangle(startX, startY, innerWaist, startY, innerWaist, startY - 4 * scaleY, startX, startY - 4 * scaleY),
    generateRectangle(
      startX - 1 * scaleX,
      startY,
      startX - 2.5 * scaleX,
      startY,
      startX - 2.5 * scaleX,
      startY - 4 * scaleY,
      startX - 1 * scaleX,
      startY - 4 * scaleY,
    ),
    generateRectangle(
      innerWaist + 11.5 * scaleX,
      startY,
      innerWaist + 10 * scaleX,
      startY,
      innerWaist + 10 * scaleX,
      startY - 4 * scaleY,
      innerWaist + 11.5 * scaleX,
      startY - 4 * scaleY,
    ),
  ].join(' ')
  const leftWaist = [
    generateRectangle(
      2 * innerWaist - startX,
      startY,
      2 * innerWaist - innerWaist,
      startY,
      2 * innerWaist - innerWaist,
      startY - 4 * scaleY,
      2 * innerWaist - startX,
      startY - 4 * scaleY,
    ),
    generateRectangle(
      2 * innerWaist - (startX - 1 * scaleX),
      startY,
      2 * innerWaist - (startX - 2.5 * scaleX),
      startY,
      2 * innerWaist - (startX - 2.5 * scaleX),
      startY - 4 * scaleY,
      2 * innerWaist - (startX - 1 * scaleX),
      startY - 4 * scaleY,
    ),
    generateRectangle(
      2 * innerWaist - (innerWaist + 11.5 * scaleX),
      startY,
      2 * innerWaist - (innerWaist + 10 * scaleX),
      startY,
      2 * innerWaist - (innerWaist + 10 * scaleX),
      startY - 4 * scaleY,
      2 * innerWaist - (innerWaist + 11.5 * scaleX),
      startY - 4 * scaleY,
    ),
  ].join(' ')
  return { rightWaist, leftWaist }
}
