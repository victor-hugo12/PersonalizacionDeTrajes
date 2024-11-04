import { ImageSourcePropType } from 'react-native'

export interface Garment {
  label: string
  descriptionKey: string
  price: string
  image: ImageSourcePropType
}

export const GARMENTS: Garment[] = [
  {
    label: 'Pantalón',
    descriptionKey: 'Pantalón_description',
    price: '$50.00',
    image: require('@/assets/images/Pantalon.png'),
  },
  {
    label: 'Chaleco',
    descriptionKey: 'Chaleco_description',
    price: '$30.00',
    image: require('@/assets/images/Chaleco.png'),
  },
  {
    label: 'Saco',
    descriptionKey: 'Saco_description',
    price: '$70.00',
    image: require('@/assets/images/Saco.png'),
  },
]
export const SIZE_DIMENSIONS = {
  S: { width: 260, height: 260 },
  M: { width: 265, height: 265 },
  L: { width: 270, height: 270 },
  XL: { width: 275, height: 275 },
} as const
export type SizeType = keyof typeof SIZE_DIMENSIONS
