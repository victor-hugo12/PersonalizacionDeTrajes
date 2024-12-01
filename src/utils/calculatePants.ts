import { calculateDistance } from './utils'

export const calculatePants = (
  {
    hem,
    knee,
    thigh,
    waist,
    length,
    inseam,
  }: {
    hem: number
    knee: number
    thigh: number
    waist: number
    length: number
    inseam: number
  },
  containerWidth: number,
  containerHeight: number,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  let pocket = 18 * scaleY
  if (length * scaleY - inseam * scaleY - 4 * scaleY > 18 * scaleX) {
    pocket = 18 * scaleY
  } else {
    pocket = length * scaleY - inseam * scaleY - 4 * scaleY
  }

  const startX = 90 * scaleX
  const innerWaist = startX - waist * scaleX
  const startY = 10 * scaleY
  const innerThigh = innerWaist - 1 * scaleX
  const sideThigh = innerThigh + thigh * scaleX
  const thighY = startY + length * scaleY - inseam * scaleY
  const sideknee = sideThigh - ((thigh - knee) / 2) * scaleX
  const innerknee = innerThigh + ((thigh - knee) / 2) * scaleX
  const kneeY = thighY + (inseam / 2 - 5) * scaleY
  const sideHem = sideknee - ((knee - hem) / 2) * scaleX
  const innerHem = innerknee + ((knee - hem) / 2) * scaleX
  const hemY = kneeY + (inseam / 2 + 5) * scaleY

  const x9 = startX - 4 * scaleX
  let t = 0.0
  let pocketX, pocketY
  const precision = 0.001

  do {
    pocketX =
      (1 - t) ** 3 * startX +
      3 * (1 - t) ** 2 * t * (sideThigh - (sideThigh - startX) / 2.5) +
      3 * (1 - t) * t ** 2 * sideThigh +
      t ** 3 * sideThigh
    pocketY =
      (1 - t) ** 3 * startY +
      3 * (1 - t) ** 2 * t * (thighY - (thighY - startY) / 1.25) +
      3 * (1 - t) * t ** 2 * (thighY - (thighY - startY) / 2.75) +
      t ** 3 * thighY
    t += precision
  } while (calculateDistance(x9, startY, pocketX, pocketY) < pocket && t <= 1.0)

  const rigthPantsPath = `M ${startX},${startY}
      C ${sideThigh - (sideThigh - startX) / 2.5},${thighY - (thighY - startY) / 1.25} ${sideThigh},${thighY - (thighY - startY) / 2.75} ${sideThigh},${thighY}
      C ${sideknee + (sideThigh - sideknee) / 1.15},${thighY - (thighY - kneeY) / 5} ${sideknee + (sideThigh - sideknee) / 2.2},${thighY - (thighY - kneeY) / 2.5} ${sideknee},${kneeY}
      L ${sideHem},${hemY}
      L ${innerHem},${hemY}
      L ${innerknee},${kneeY}
      C ${innerknee - (innerknee - innerThigh) / 1.15},${thighY - (thighY - kneeY) / 5} ${innerknee - (innerknee - innerThigh) / 2.2},${thighY - (thighY - kneeY) / 2.5} ${innerThigh},${thighY}
      L ${innerWaist},${startY}
      M ${x9},${startY}  ${pocketX},${pocketY}
            M ${startX},${startY} L${innerWaist},${startY} L${innerWaist},${startY - 4 * scaleX} L${startX},${startY - 4 * scaleX} z
            M ${startX - 1 * scaleX},${startY} L${startX - 2.5 * scaleX},${startY} L${startX - 2.5 * scaleX},${startY - 4 * scaleX} L${startX - 1 * scaleX},${startY - 4 * scaleX} z
            M ${startX - 11 * scaleX},${startY} L${startX - 12.5 * scaleX},${startY} L${startX - 12.5 * scaleX},${startY - 4 * scaleX} L${startX - 11 * scaleX},${startY - 4 * scaleX} z
            `

  const leftPantsPath = `M ${2 * innerWaist - startX},${startY}
            C ${2 * innerWaist - (sideThigh - (sideThigh - startX) / 2.5)},${thighY - (thighY - startY) / 1.25} ${2 * innerWaist - sideThigh},${thighY - (thighY - startY) / 2.75} ${2 * innerWaist - sideThigh},${thighY}
            C ${2 * innerWaist - (sideknee + (sideThigh - sideknee) / 1.15)},${thighY - (thighY - kneeY) / 5} ${2 * innerWaist - (sideknee + (sideThigh - sideknee) / 2.2)},${thighY - (thighY - kneeY) / 2.5} ${2 * innerWaist - sideknee},${kneeY}
            L ${2 * innerWaist - sideHem},${hemY}
            L ${2 * innerWaist - innerHem},${hemY}
            L ${2 * innerWaist - innerknee},${kneeY}
            C ${2 * innerWaist - (innerknee - (innerknee - innerThigh) / 1.15)},${thighY - (thighY - kneeY) / 5} ${2 * innerWaist - (innerknee - (innerknee - innerThigh) / 2.2)},${thighY - (thighY - kneeY) / 2.5} ${2 * innerWaist - innerThigh},${thighY}
            L ${2 * innerWaist - innerWaist},${startY}
            M ${2 * innerWaist - x9},${startY} ${2 * innerWaist - pocketX},${pocketY}
                  M ${2 * innerWaist - startX},${startY} L${2 * innerWaist - innerWaist},${startY} L${2 * innerWaist - innerWaist},${startY - 4 * scaleX} L${2 * innerWaist - startX},${startY - 4 * scaleX} z
                  M ${2 * innerWaist - (startX - 1 * scaleX)},${startY} L${2 * innerWaist - (startX - 2.5 * scaleX)},${startY} L${2 * innerWaist - (startX - 2.5 * scaleX)},${startY - 4 * scaleX} L${2 * innerWaist - (startX - 1 * scaleX)},${startY - 4 * scaleX} z
                  M ${2 * innerWaist - (startX - 11 * scaleX)},${startY} L${2 * innerWaist - (startX - 12.5 * scaleX)},${startY} L${2 * innerWaist - (startX - 12.5 * scaleX)},${startY - 4 * scaleX} L${2 * innerWaist - (startX - 11 * scaleX)},${startY - 4 * scaleX} z`

  return { rigthPantsPath, leftPantsPath }
}
