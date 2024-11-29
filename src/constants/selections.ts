export const MEASUREMENTS = ['S', 'M', 'L', 'XL']
export const MEASUREMENTS_OPTIONS = [{ value: 'S' }, { value: 'M' }, { value: 'L' }, { value: 'XL' }]

export const CLOTHES_OPTIONS = [{ value: 'Pants' }, { value: 'Vest' }, { value: 'Coat' }]
export const CLOTHES = ['Pants', 'Vest', 'Coat'] as const
export type GarmentType = (typeof CLOTHES)[number]

export const SIZE_DIMENSIONS = {
  S: { width: 260, height: 260 },
  M: { width: 265, height: 265 },
  L: { width: 270, height: 270 },
  XL: { width: 275, height: 275 },
} as const
export type SizeType = keyof typeof SIZE_DIMENSIONS

export const getGarmentImage = (garmentType: GarmentType) => {
  switch (garmentType) {
    case 'Pants':
      return require('@/assets/images/pants.png')
    case 'Vest':
      return require('@/assets/images/vest.png')
    case 'Coat':
      return require('@/assets/images/coat.png')
    default:
      return null
  }
}
