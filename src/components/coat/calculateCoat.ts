// src/components/Trapecio/calculateTrapecio.ts
// src/components/Trapecio/calculateTrapecio.ts
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
  containerWidth: number, // Nuevo parámetro para el ancho del contenedor
  containerHeight: number, // Nuevo parámetro para la altura del contenedor
) => {
  const SVG_WIDTH = containerWidth
  const SVG_HEIGHT = containerHeight
  const escalaX = SVG_WIDTH / 120
  const escalaY = SVG_HEIGHT / 120
  const x1 = 70 * escalaX
  const y1 = 20 * escalaY
  const x2 = x1 + shoulder * escalaX
  const y2 = y1 + 4 * escalaX
  const x3 = x1 + (chest * escalaX) / 6 + (chest * escalaX) / 8 + 6 * escalaX
  const y3 = y1 + (escalaY * length) / 3
  const x4 = x3 - escalaX
  const y4 = y1 + length * escalaY
  const x5 = x4 - (escalaX * chest) / 2 + 4 * escalaX
  const y5 = y1 + length * escalaY
  const x6 = x5 - 9 * escalaX
  const y6 = y1 + length * escalaY - 10 * escalaX
  const y7 = y1 + (escalaY * length) / 2
  const x8 = x4
  const y8 = y6 - 4 * escalaY
  //brazo
  const d = `M ${x1},${y1} L ${x2},${y2}
      Q ${x2 + (x3 - x2) / 1.75},${y2 + (y3 - y2) / 1.2}  ${x3},${y3}
      C ${x4 - (x3 - x4) / 0.5},${y3 + (y4 - y3) / 6.2} ${x4 + (x3 - x4) / 4},${y3 + (y4 - y3) / 1.4} ${x4},${y4}
      L ${x5},${y5}
      Q ${x5 - (x5 - x6) / 1.3},${y5 - (y5 - y6) / 5} ${x6},${y6}
      L ${x6},${y7}
      L ${x1},${y1}
      `
  const xRef = x6 + 2 * escalaX
  const dReflejado = `
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

  const dbolsillo = `M ${x8},${y8}
      L ${x8 - 13 * escalaX},${y8 - 1.5 * escalaY}
      L ${x8 - 13 * escalaX},${y8 - 6 * escalaY}
      L ${x8},${y8 - 4.5 * escalaY}
      Z`
  const dBolsilloReflejado = `M ${2 * xRef - x8},${y8}
  L ${2 * xRef - (x8 - 13 * escalaX)},${y8 - 1.5 * escalaY}
  L ${2 * xRef - (x8 - 13 * escalaX)},${y8 - 6 * escalaY}
  L ${2 * xRef - x8},${y8 - 4.5 * escalaY}
  Z
`
  const botones = []
  const numBotones = 2
  const primerBoton = y6 - 4 * escalaY
  const ultimoBoton = y7 + 4 * escalaY
  const espacioEntreBotones = (ultimoBoton - primerBoton) / (numBotones - 1)
  for (let i = 0; i <= numBotones - 1; i++) {
    const yBoton = primerBoton + i * espacioEntreBotones
    botones.push({ cx: x6 + 1.5 * escalaX, cy: yBoton, r: 1 * escalaX })
  }
  const x1Reflejado = x1 - 2 * (x1 - x6) + 4 * escalaX
  const curvaControl1X = (x1 + x1Reflejado) / 2
  const curvaControl1Y = y1 - 2 * escalaY
  const Cuello = `M ${x1},${y1} Q ${curvaControl1X},${curvaControl1Y} ${x1Reflejado},${y1}
                      L ${x1Reflejado},${y1 - 4 * escalaY} Q ${curvaControl1X},${curvaControl1Y - 4 * escalaY} ${x1},${y1 - 4 * escalaY}
                      M ${x1},${y1} Q ${curvaControl1X},${curvaControl1Y} ${x1Reflejado},${y1} L ${x6} ${y7}
                      `
  const cuellox1 = x6 + (5 / 6) * (x1 - x6)
  const cuelloy1 = y7 + (5 / 6) * (y1 - y7)
  const cuello1 = `M ${x6},${y7} L ${cuellox1 + 3 * escalaX},${cuelloy1 + 3 * escalaY}
      L ${cuellox1},${cuelloy1} z
         M ${cuellox1},${cuelloy1} L ${cuellox1 + 4 * escalaX},${cuelloy1}
         L ${x1},${y1 - 4 * escalaY} z
      `
  const cuello1Reflejado = `
  M ${2 * xRef - x6},${y7}
  L ${2 * xRef - (cuellox1 + 3 * escalaY)},${cuelloy1 + 3 * escalaY}
  L ${2 * xRef - cuellox1},${cuelloy1} z
  M ${2 * xRef - cuellox1},${cuelloy1}
  L ${2 * xRef - (cuellox1 + 4 * escalaY)},${cuelloy1}
  L ${2 * xRef - x1},${y1 - 4 * escalaY} z
`
  const x9 = x3 + 14 * escalaX
  const y9 = y2 + arm * escalaX
  const x10 = x9 - 12 * escalaX
  const y10 = y2 + arm * escalaX + 4 * escalaX
  const x11 = x2 - 12 * escalaX
  const y11 = y2 + 4 * escalaX
  const brazo1 = `M ${x2},${y2} Q ${x2 + (x9 - x2) / 1.2},${y2 + (y9 - y2) / 2.25} ${x9},${y9}
          L ${x10},${y10}
          Q ${x11 + (x10 - x11) / 1.2},${y11 + (y10 - y11) / 2.25} ${x11},${y11}
      `
  const brazo1Reflejado = `
  M ${2 * xRef - x2},${y2}
  Q ${2 * xRef - (x2 + (x9 - x2) / 1.2)},${y2 + (y9 - y2) / 2.25}
    ${2 * xRef - x9},${y9}
  L ${2 * xRef - x10},${y10}
  Q ${2 * xRef - (x11 + (x10 - x11) / 1.2)},${y11 + (y10 - y11) / 2.25}
    ${2 * xRef - x11},${y11}
`

  return {
    original: d,
    reflejado: dReflejado,
    bolsillo: dbolsillo,
    bolsilloReflejado: dBolsilloReflejado,
    botones,
    Cuello,
    cuello1,
    cuello1Reflejado,
    brazo1,
    brazo1Reflejado,
  }
}
