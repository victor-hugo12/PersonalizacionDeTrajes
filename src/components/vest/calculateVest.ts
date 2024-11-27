// src/components/Trapecio/calculateTrapecio.ts
export const calculateVest = (
  { length, shoulder, chest }: { length: number; shoulder: number; chest: number },
  containerWidth: number, // Nuevo parámetro para el ancho del contenedor
  containerHeight: number, // Nuevo parámetro para la altura del contenedor
) => {
  // Usar valores dinámicos en lugar de valores fijos
  const SVG_WIDTH = containerWidth
  const SVG_HEIGHT = containerHeight

  const escalaX = SVG_WIDTH / 120
  const escalaY = SVG_HEIGHT / 120
  const x1 = 70 * escalaX
  const y1 = 10 * escalaY
  const x2 = x1 + shoulder * escalaX
  const y2 = y1 + 4 * escalaX
  const x3 = x1 + (chest * escalaX * 1) / 6 + (chest * escalaX * 1) / 8 + 2 * escalaX
  const y3 = y1 + length * escalaX - 35 * escalaX
  const x4 = x3 - escalaX
  const y4 = y1 + length * escalaX - 4 * escalaY
  const x5 = x4 - (escalaX * chest) / 2
  const y5 = y1 + length * escalaX
  const x6 = x5 - 4 * escalaX
  const y6 = y1 + length * escalaX - 10 * escalaY
  const y7 = y3 + 1 * escalaX
  const x8 = x6 + 9 * escalaX
  const y8 = y6 - 4 * escalaX
  const d = `M ${x1},${y1} L ${x2},${y2}
      C ${x2 - (x3 - x2) / 1.875},${y3 - (y3 - y2) / 4.5} ${x2 - (x3 - x2) / 1.25},${y3 - (y3 - y2) / 27} ${x3},${y3}
      C ${x4 - (x3 - x4) / 0.5},${y3 + (y4 - y3) / 6.2} ${x4 + (x3 - x4) / 4},${y3 + (y4 - y3) / 1.4} ${x4},${y4}
      L ${x5},${y5}
      L ${x6},${y6}
      L ${x6},${y7}
      L ${x1},${y1}
    `

  const xRef = x6 + 2 * escalaX
  const dReflejado = `M ${2 * xRef - x1},${y1} L ${2 * xRef - x2},${y2}
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

  const dbolsillo = `M ${x8},${y8}
      L ${x8 + 13 * escalaX},${y8 - 1.5 * escalaY}
      L ${x8 + 13 * escalaX},${y8 - 3 * escalaY}
      L ${x8},${y8 - 1.5 * escalaY}
      Z`

  const dBolsilloReflejado = `M ${2 * xRef - x8},${y8}
      L ${2 * xRef - (x8 + 13 * escalaX)},${y8 - 1.5 * escalaY}
      L ${2 * xRef - (x8 + 13 * escalaX)},${y8 - 3 * escalaY}
      L ${2 * xRef - x8},${y8 - 1.5 * escalaY}
      Z`
  // Cálculo de botones
  const botones = []
  const numBotones = 4
  const primerBoton = y6 - 1 * escalaY
  const ultimoBoton = y7 + 1 * escalaY
  const espacioEntreBotones = (ultimoBoton - primerBoton) / (numBotones - 1)
  for (let i = 0; i <= numBotones - 1; i++) {
    const yBoton = primerBoton + i * espacioEntreBotones
    botones.push({ cx: x6 + 1.5 * escalaX, cy: yBoton, r: 1 * escalaX })
  }
  const x1Reflejado = x1 - 2 * (x1 - x6) + 4 * escalaX
  const curvaControl1X = (x1 + x1Reflejado) / 2
  const curvaControl1Y = y1 + 6 * escalaY
  const Cuello = `M ${x1},${y1} Q ${curvaControl1X},${curvaControl1Y} ${x1Reflejado},${y1} L${x6},${y7}`
  return {
    original: d,
    reflejado: dReflejado,
    bolsillo: dbolsillo,
    bolsilloReflejado: dBolsilloReflejado,
    botones,
    Cuello,
  }
}
