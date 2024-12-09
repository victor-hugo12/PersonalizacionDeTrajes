export function generateButtons(
  numButtons: number,
  firstButton: number,
  lastButton: number,
  scaleX: number,
  innerEdgeX: number,
) {
  const spaceBetweenButtons = (lastButton - firstButton) / (numButtons - 1)
  const buttons = []

  for (let i = 0; i < numButtons; i++) {
    const yBoton = firstButton + i * spaceBetweenButtons
    buttons.push({ cx: innerEdgeX + 1.5 * scaleX, cy: yBoton, r: 1 * scaleX })
  }

  return buttons
}
