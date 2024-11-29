export const calculateCoat = (
  {
    length,
    shoulder,
    chest,
    arm,
  }: {
    length: number
    shoulder: number
    chest: number
    arm: number
  },
  containerWidth: number,
  containerHeight: number,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const x1 = 70 * scaleX
  const y1 = 20 * scaleY
  const x2 = x1 + shoulder * scaleX
  const y2 = y1 + 4 * scaleX
  const x3 = x1 + (chest * scaleX) / 6 + (chest * scaleX) / 8 + 6 * scaleX
  const y3 = y1 + (scaleY * length) / 3
  const x4 = x3 - scaleX
  const y4 = y1 + length * scaleY
  const x5 = x4 - (scaleX * chest) / 2 + 4 * scaleX
  const y5 = y1 + length * scaleY
  const x6 = x5 - 9 * scaleX
  const y6 = y1 + length * scaleY - 10 * scaleX
  const y7 = y1 + (scaleY * length) / 2
  const x8 = x4
  const y8 = y6 - 4 * scaleY

  const original = `M ${x1},${y1} L ${x2},${y2}
      Q ${x2 + (x3 - x2) / 1.75},${y2 + (y3 - y2) / 1.2}  ${x3},${y3}
      C ${x4 - (x3 - x4) / 0.5},${y3 + (y4 - y3) / 6.2} ${x4 + (x3 - x4) / 4},${y3 + (y4 - y3) / 1.4} ${x4},${y4}
      L ${x5},${y5}
      Q ${x5 - (x5 - x6) / 1.3},${y5 - (y5 - y6) / 5} ${x6},${y6}
      L ${x6},${y7}
      L ${x1},${y1}
      `
  const xRef = x6 + 2 * scaleX
  const reflected = `
        M ${2 * xRef - x1},${y1}
        L ${2 * xRef - x2},${y2}
        Q ${2 * xRef - (x2 + (x3 - x2) / 1.75)},${y2 + (y3 - y2) / 1.2}
          ${2 * xRef - x3},${y3}
        C ${2 * xRef - (x4 - (x3 - x4) / 0.5)},${y3 + (y4 - y3) / 6.2}
          ${2 * xRef - (x4 + (x3 - x4) / 4)},${y3 + (y4 - y3) / 1.4}
          ${2 * xRef - x4},${y4}
        L ${2 * xRef - x5},${y5}
        Q ${2 * xRef - (x5 - (x5 - x6) / 1.3)},${y5 - (y5 - y6) / 5}
          ${2 * xRef - x6},${y6}
        L ${2 * xRef - x6},${y7}
        L ${2 * xRef - x1},${y1}
      `

  const pocket = `M ${x8},${y8}
      L ${x8 - 13 * scaleX},${y8 - 1.5 * scaleY}
      L ${x8 - 13 * scaleX},${y8 - 6 * scaleY}
      L ${x8},${y8 - 4.5 * scaleY}
      Z`
  const mirroredPocket = `M ${2 * xRef - x8},${y8}
  L ${2 * xRef - (x8 - 13 * scaleX)},${y8 - 1.5 * scaleY}
  L ${2 * xRef - (x8 - 13 * scaleX)},${y8 - 6 * scaleY}
  L ${2 * xRef - x8},${y8 - 4.5 * scaleY}
  Z
`
  const buttons = []
  const numButtons = 2
  const firstButton = y6 - 4 * scaleY
  const lastButton = y7 + 4 * scaleY
  const spacebetweenButtons = (lastButton - firstButton) / (numButtons - 1)
  for (let i = 0; i <= numButtons - 1; i++) {
    const yBoton = firstButton + i * spacebetweenButtons
    buttons.push({ cx: x6 + 1.5 * scaleX, cy: yBoton, r: 1 * scaleX })
  }
  const x1reflected = x1 - 2 * (x1 - x6) + 4 * scaleX
  const curveControl1X = (x1 + x1reflected) / 2
  const curveControl1Y = y1 - 2 * scaleY
  const neck = `M ${x1},${y1} Q ${curveControl1X},${curveControl1Y} ${x1reflected},${y1}
                      L ${x1reflected},${y1 - 4 * scaleY} Q ${curveControl1X},${curveControl1Y - 4 * scaleY} ${x1},${y1 - 4 * scaleY}
                      M ${x1},${y1} Q ${curveControl1X},${curveControl1Y} ${x1reflected},${y1} L ${x6} ${y7}
                      `
  const neckx1 = x6 + (5 / 6) * (x1 - x6)
  const necky1 = y7 + (5 / 6) * (y1 - y7)
  const neck1 = `M ${x6},${y7} L ${neckx1 + 3 * scaleX},${necky1 + 3 * scaleY}
      L ${neckx1},${necky1} z
         M ${neckx1},${necky1} L ${neckx1 + 4 * scaleX},${necky1}
         L ${x1},${y1 - 4 * scaleY} z
      `
  const neck1Mirrored = `
  M ${2 * xRef - x6},${y7}
  L ${2 * xRef - (neckx1 + 3 * scaleY)},${necky1 + 3 * scaleY}
  L ${2 * xRef - neckx1},${necky1} z
  M ${2 * xRef - neckx1},${necky1}
  L ${2 * xRef - (neckx1 + 4 * scaleY)},${necky1}
  L ${2 * xRef - x1},${y1 - 4 * scaleY} z
`
  const x9 = x3 + 14 * scaleX
  const y9 = y2 + arm * scaleX
  const x10 = x9 - 12 * scaleX
  const y10 = y2 + arm * scaleX + 4 * scaleX
  const x11 = x2 - 12 * scaleX
  const y11 = y2 + 4 * scaleX
  const arm1 = `M ${x2},${y2} Q ${x2 + (x9 - x2) / 1.2},${y2 + (y9 - y2) / 2.25} ${x9},${y9}
          L ${x10},${y10}
          Q ${x11 + (x10 - x11) / 1.2},${y11 + (y10 - y11) / 2.25} ${x11},${y11}
      `
  const arm1Mirrored = `
  M ${2 * xRef - x2},${y2}
  Q ${2 * xRef - (x2 + (x9 - x2) / 1.2)},${y2 + (y9 - y2) / 2.25}
    ${2 * xRef - x9},${y9}
  L ${2 * xRef - x10},${y10}
  Q ${2 * xRef - (x11 + (x10 - x11) / 1.2)},${y11 + (y10 - y11) / 2.25}
    ${2 * xRef - x11},${y11}
`

  return {
    original,
    reflected,
    pocket,
    mirroredPocket,
    buttons,
    neck,
    neck1,
    neck1Mirrored,
    arm1,
    arm1Mirrored,
  }
}
