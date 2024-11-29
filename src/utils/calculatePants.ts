import { calculateDistance } from './mathutils'

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

  const x1 = 80 * scaleX
  const x8 = x1 - waist * scaleX
  const y1 = 10 * scaleY
  const x7 = x8 - 1 * scaleX
  const x2 = x7 + thigh * scaleX
  const y2 = y1 + length * scaleY - inseam * scaleY
  const x3 = x2 - ((thigh - knee) / 2) * scaleX
  const x6 = x7 + ((thigh - knee) / 2) * scaleX
  const y3 = y2 + (inseam / 2 - 5) * scaleY
  const x4 = x3 - ((knee - hem) / 2) * scaleX
  const x5 = x6 + ((knee - hem) / 2) * scaleX
  const y4 = y3 + (inseam / 2 + 5) * scaleY

  const x9 = x1 - 4 * scaleX
  let t = 0.0
  let x10, y5
  const precision = 0.001

  do {
    x10 = (1 - t) ** 3 * x1 + 3 * (1 - t) ** 2 * t * (x2 - (x2 - x1) / 2.5) + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x2
    y5 =
      (1 - t) ** 3 * y1 +
      3 * (1 - t) ** 2 * t * (y2 - (y2 - y1) / 1.25) +
      3 * (1 - t) * t ** 2 * (y2 - (y2 - y1) / 2.75) +
      t ** 3 * y2
    t += precision
  } while (calculateDistance(x9, y1, x10, y5) < pocket && t <= 1.0)

  const original = `M ${x1},${y1}
      C ${x2 - (x2 - x1) / 2.5},${y2 - (y2 - y1) / 1.25} ${x2},${y2 - (y2 - y1) / 2.75} ${x2},${y2}
      C ${x3 + (x2 - x3) / 1.15},${y2 - (y2 - y3) / 5} ${x3 + (x2 - x3) / 2.2},${y2 - (y2 - y3) / 2.5} ${x3},${y3}
      L ${x4},${y4}
      L ${x5},${y4}
      L ${x6},${y3}
      C ${x6 - (x6 - x7) / 1.15},${y2 - (y2 - y3) / 5} ${x6 - (x6 - x7) / 2.2},${y2 - (y2 - y3) / 2.5} ${x7},${y2}
      L ${x8},${y1}
      M ${x9},${y1}  ${x10},${y5}
            M ${x1},${y1} L${x8},${y1} L${x8},${y1 - 4 * scaleX} L${x1},${y1 - 4 * scaleX} z
            M ${x1 - 1 * scaleX},${y1} L${x1 - 2.5 * scaleX},${y1} L${x1 - 2.5 * scaleX},${y1 - 4 * scaleX} L${x1 - 1 * scaleX},${y1 - 4 * scaleX} z
            M ${x1 - 11 * scaleX},${y1} L${x1 - 12.5 * scaleX},${y1} L${x1 - 12.5 * scaleX},${y1 - 4 * scaleX} L${x1 - 11 * scaleX},${y1 - 4 * scaleX} z
            `

  const reflected = `M ${2 * x8 - x1},${y1}
            C ${2 * x8 - (x2 - (x2 - x1) / 2.5)},${y2 - (y2 - y1) / 1.25} ${2 * x8 - x2},${y2 - (y2 - y1) / 2.75} ${2 * x8 - x2},${y2}
            C ${2 * x8 - (x3 + (x2 - x3) / 1.15)},${y2 - (y2 - y3) / 5} ${2 * x8 - (x3 + (x2 - x3) / 2.2)},${y2 - (y2 - y3) / 2.5} ${2 * x8 - x3},${y3}
            L ${2 * x8 - x4},${y4}
            L ${2 * x8 - x5},${y4}
            L ${2 * x8 - x6},${y3}
            C ${2 * x8 - (x6 - (x6 - x7) / 1.15)},${y2 - (y2 - y3) / 5} ${2 * x8 - (x6 - (x6 - x7) / 2.2)},${y2 - (y2 - y3) / 2.5} ${2 * x8 - x7},${y2}
            L ${2 * x8 - x8},${y1}
            M ${2 * x8 - x9},${y1} ${2 * x8 - x10},${y5}
                  M ${2 * x8 - x1},${y1} L${2 * x8 - x8},${y1} L${2 * x8 - x8},${y1 - 4 * scaleX} L${2 * x8 - x1},${y1 - 4 * scaleX} z
                  M ${2 * x8 - (x1 - 1 * scaleX)},${y1} L${2 * x8 - (x1 - 2.5 * scaleX)},${y1} L${2 * x8 - (x1 - 2.5 * scaleX)},${y1 - 4 * scaleX} L${2 * x8 - (x1 - 1 * scaleX)},${y1 - 4 * scaleX} z
                  M ${2 * x8 - (x1 - 11 * scaleX)},${y1} L${2 * x8 - (x1 - 12.5 * scaleX)},${y1} L${2 * x8 - (x1 - 12.5 * scaleX)},${y1 - 4 * scaleX} L${2 * x8 - (x1 - 11 * scaleX)},${y1 - 4 * scaleX} z`

  return { original, reflected }
}
