export const generateRightPocketCircularPath = (
  pocketstart: number,
  startY: number,
  innerThigh: number,
  pocketY: number,
): string => {
  return `M ${pocketstart},${startY}
  C ${pocketstart + (innerThigh - pocketstart) / 2},${startY + (pocketY - startY) / 3} ${pocketstart + (innerThigh - pocketstart) / 3.2},${startY + (pocketY - startY) / 1.5} ${innerThigh},${pocketY}`
}
export function generateLeftPocketCircularPath(
  innerWaist: number,
  pocketstart: number,
  startY: number,
  innerThigh: number,
  pocketY: number,
): string {
  return `M ${2 * innerWaist - pocketstart},${startY}
  C ${2 * innerWaist - pocketstart - (innerThigh - pocketstart) / 2},${startY + (pocketY - startY) / 3}
    ${2 * innerWaist - pocketstart - (innerThigh - pocketstart) / 3.2},${startY + (pocketY - startY) / 1.5}
    ${2 * innerWaist - innerThigh},${pocketY}`
}
export function generateRightPocketPath(
  pocketstart: number,
  startY: number,
  innerThigh: number,
  pocketY: number,
): string {
  return `M ${pocketstart},${startY}
          L ${innerThigh},${pocketY}`
}

export function generateLeftPocketPath(
  innerWaist: number,
  pocketstart: number,
  startY: number,
  pocketX: number,
  pocketY: number,
): string {
  return `M ${2 * innerWaist - pocketstart},${startY}
          L ${2 * innerWaist - pocketX},${pocketY}`
}
export function generateRightPocketLPath(
  pocketstart: number,
  startY: number,
  pocketX: number,
  pocketY: number,
  escalaX: number,
  escalaY: number,
): string {
  return `M ${pocketstart},${startY}
  L ${pocketstart + 4 * escalaX},${pocketY - 4 * escalaY}
          L ${pocketX},${pocketY}`
}
export function generateLeftPocketLPath(
  innerWaist: number,
  pocketstart: number,
  startY: number,
  pocketX: number,
  pocketY: number,
  escalaX: number,
  escalaY: number,
): string {
  return `M ${2 * innerWaist - pocketstart},${startY}
          L ${2 * innerWaist - pocketstart - 4 * escalaX},${pocketY - 4 * escalaY}
          L ${2 * innerWaist - pocketX},${pocketY} `
}
