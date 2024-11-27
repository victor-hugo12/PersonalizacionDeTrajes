export const darkenColor = (hex: string, amount: number = 0.2): string => {
  hex = hex.replace('#', '')
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  r = Math.max(0, r - r * amount)
  g = Math.max(0, g - g * amount)
  b = Math.max(0, b - b * amount)

  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).padStart(6, '0')}`.toUpperCase()
}
