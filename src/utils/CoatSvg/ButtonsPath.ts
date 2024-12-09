export function generateButtons(
  innerEdgeX: number,
  bottomInnerEdgeY: number,
  topInnerEdgeY: number,
  scaleX: number,
  scaleY: number,
  numButtons: number,
): { cx: number; cy: number; r: number }[] {
  const buttons: { cx: number; cy: number; r: number }[] = []
  const firstButton = bottomInnerEdgeY - 4 * scaleY
  const lastButton = topInnerEdgeY + 4 * scaleY
  const spaceBetweenButtons = numButtons > 1 ? (lastButton - firstButton) / (numButtons - 1) : 0
  const centerY = (firstButton + lastButton) / 2

  for (let i = 0; i < numButtons; i++) {
    const yButton = numButtons === 1 ? centerY : firstButton + i * spaceBetweenButtons
    buttons.push({ cx: innerEdgeX + 1.5 * scaleX, cy: yButton, r: 1 * scaleX })
  }

  return buttons
}
