export const calculateVest = (
  { length, shoulder, chest }: { length: number; shoulder: number; chest: number },
  containerWidth: number,
  containerHeight: number,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const x1 = 70 * scaleX
  const y1 = 10 * scaleY
  const x2 = x1 + shoulder * scaleX
  const y2 = y1 + 4 * scaleX
  const x3 = x1 + (chest * scaleX * 1) / 6 + (chest * scaleX * 1) / 8 + 2 * scaleX
  const y3 = y1 + length * scaleX - 35 * scaleX
  const x4 = x3 - scaleX
  const y4 = y1 + length * scaleX - 4 * scaleY
  const x5 = x4 - (scaleX * chest) / 2
  const y5 = y1 + length * scaleX
  const x6 = x5 - 4 * scaleX
  const y6 = y1 + length * scaleX - 10 * scaleY
  const y7 = y3 + 1 * scaleX
  const x8 = x6 + 9 * scaleX
  const y8 = y6 - 4 * scaleX
  const original = `M ${x1},${y1} L ${x2},${y2}
      C ${x2 - (x3 - x2) / 1.875},${y3 - (y3 - y2) / 4.5} ${x2 - (x3 - x2) / 1.25},${y3 - (y3 - y2) / 27} ${x3},${y3}
      C ${x4 - (x3 - x4) / 0.5},${y3 + (y4 - y3) / 6.2} ${x4 + (x3 - x4) / 4},${y3 + (y4 - y3) / 1.4} ${x4},${y4}
      L ${x5},${y5}
      L ${x6},${y6}
      L ${x6},${y7}
      L ${x1},${y1}
    `

  const xRef = x6 + 2 * scaleX
  const reflected = `M ${2 * xRef - x1},${y1} L ${2 * xRef - x2},${y2}
        C ${2 * xRef - (x2 - (x3 - x2) / 1.875)},${y3 - (y3 - y2) / 4.5}
          ${2 * xRef - (x2 - (x3 - x2) / 1.25)},${y3 - (y3 - y2) / 27}
          ${2 * xRef - x3},${y3}
        C ${2 * xRef - (x4 - (x3 - x4) / 0.5)},${y3 + (y4 - y3) / 6.2}
          ${2 * xRef - (x4 + (x3 - x4) / 4)},${y3 + (y4 - y3) / 1.4}
          ${2 * xRef - x4},${y4}
        L ${2 * xRef - x5},${y5}
        L ${2 * xRef - x6},${y6}
        L ${2 * xRef - x6},${y7}
        L ${2 * xRef - x1},${y1}`

  const pocket = `M ${x8},${y8}
      L ${x8 + 13 * scaleX},${y8 - 1.5 * scaleY}
      L ${x8 + 13 * scaleX},${y8 - 3 * scaleY}
      L ${x8},${y8 - 1.5 * scaleY}
      Z`

  const mirroredPocket = `M ${2 * xRef - x8},${y8}
      L ${2 * xRef - (x8 + 13 * scaleX)},${y8 - 1.5 * scaleY}
      L ${2 * xRef - (x8 + 13 * scaleX)},${y8 - 3 * scaleY}
      L ${2 * xRef - x8},${y8 - 1.5 * scaleY}
      Z`

  const buttons = []
  const numButtons = 4
  const firstButton = y6 - 1 * scaleY
  const lastButton = y7 + 1 * scaleY
  const spacebetweenButtons = (lastButton - firstButton) / (numButtons - 1)
  for (let i = 0; i <= numButtons - 1; i++) {
    const yBoton = firstButton + i * spacebetweenButtons
    buttons.push({ cx: x6 + 1.5 * scaleX, cy: yBoton, r: 1 * scaleX })
  }
  const x1reflected = x1 - 2 * (x1 - x6) + 4 * scaleX
  const curveControl1X = (x1 + x1reflected) / 2
  const curveControl1Y = y1 + 6 * scaleY
  const neck = `M ${x1},${y1} Q ${curveControl1X},${curveControl1Y} ${x1reflected},${y1} L${x6},${y7}`
  return {
    original,
    reflected,
    pocket,
    mirroredPocket,
    buttons,
    neck,
  }
}
