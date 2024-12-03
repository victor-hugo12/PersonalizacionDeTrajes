export const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export const isDecimal = (text: string, integerDigits: number = 3, decimalDigits: number = 1) => {
  const regex = new RegExp(`^\\d{0,${integerDigits}}(\\.\\d{0,${decimalDigits}})?$`)
  return regex.test(text)
}
