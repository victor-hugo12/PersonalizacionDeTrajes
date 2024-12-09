export function generateRightPantsPath(
  startX: number,
  startY: number,
  sideThigh: number,
  thighY: number,
  sideknee: number,
  kneeY: number,
  sideHem: number,
  hemY: number,
  innerHem: number,
  innerknee: number,
  innerThigh: number,
  innerWaist: number,
  _scaleX: number,
  _scaleY: number,
): string {
  return `M ${startX},${startY}
      C ${sideThigh - (sideThigh - startX) / 2.5},${thighY - (thighY - startY) / 1.25} ${sideThigh},${thighY - (thighY - startY) / 2.75} ${sideThigh},${thighY}
      C ${sideknee + (sideThigh - sideknee) / 1.15},${thighY - (thighY - kneeY) / 5} ${sideknee + (sideThigh - sideknee) / 2.2},${thighY - (thighY - kneeY) / 2.5} ${sideknee},${kneeY}
      L ${sideHem},${hemY}
      L ${innerHem},${hemY}
      L ${innerknee},${kneeY}
      C ${innerknee - (innerknee - innerThigh) / 1.15},${thighY - (thighY - kneeY) / 5} ${innerknee - (innerknee - innerThigh) / 2.2},${thighY - (thighY - kneeY) / 2.5} ${innerThigh},${thighY}
      L ${innerWaist},${startY}
           `
}
export function generateLeftPantsPath(
  startX: number,
  startY: number,
  sideThigh: number,
  thighY: number,
  sideknee: number,
  kneeY: number,
  sideHem: number,
  hemY: number,
  innerHem: number,
  innerknee: number,
  innerThigh: number,
  innerWaist: number,
  _scaleX: number,
  _scaleY: number,
): string {
  return `M ${2 * innerWaist - startX},${startY}
            C ${2 * innerWaist - (sideThigh - (sideThigh - startX) / 2.5)},${thighY - (thighY - startY) / 1.25} ${2 * innerWaist - sideThigh},${thighY - (thighY - startY) / 2.75} ${2 * innerWaist - sideThigh},${thighY}
            C ${2 * innerWaist - (sideknee + (sideThigh - sideknee) / 1.15)},${thighY - (thighY - kneeY) / 5} ${2 * innerWaist - (sideknee + (sideThigh - sideknee) / 2.2)},${thighY - (thighY - kneeY) / 2.5} ${2 * innerWaist - sideknee},${kneeY}
            L ${2 * innerWaist - sideHem},${hemY}
            L ${2 * innerWaist - innerHem},${hemY}
            L ${2 * innerWaist - innerknee},${kneeY}
            C ${2 * innerWaist - (innerknee - (innerknee - innerThigh) / 1.15)},${thighY - (thighY - kneeY) / 5} ${2 * innerWaist - (innerknee - (innerknee - innerThigh) / 2.2)},${thighY - (thighY - kneeY) / 2.5} ${2 * innerWaist - innerThigh},${thighY}
            L ${2 * innerWaist - innerWaist},${startY}
                  `
}
