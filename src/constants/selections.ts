import { Coat } from '@/components/Coat'
import { Pants } from '@/components/Pants'
import { Vest } from '@/components/Vest'

export enum MEASUREMENTS {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export const MEASUREMENTS_OPTIONS = [
  { value: MEASUREMENTS.S },
  { value: MEASUREMENTS.M },
  { value: MEASUREMENTS.L },
  { value: MEASUREMENTS.XL },
]

export enum CLOTHES {
  Pants = 'Pants',
  Vest = 'Vest',
  Coat = 'Coat',
}

export const CLOTHES_OPTIONS = [{ value: CLOTHES.Pants }, { value: CLOTHES.Vest }, { value: CLOTHES.Coat }]

export type GarmentType = `${CLOTHES}`

export interface VestProps {
  length: number
  shoulder: number
  chest: number
  width?: number
  height?: number
  fillColor?: string
  strokeColor?: string
}

export interface PantsProps {
  hem: number
  knee: number
  thigh: number
  waist: number
  length: number
  inseam: number
  width?: number
  height?: number
  fillColor?: string
  strokeColor?: string
}

export interface CoatProps {
  length: number
  shoulder: number
  chest: number
  arm: number
  width?: number
  height?: number
  fillColor?: string
  strokeColor?: string
}
export type GarmentProps = VestProps | PantsProps | CoatProps
export const GARMENT_MEASUREMENTS = {
  Vest: {
    component: Vest,
    measures: {
      S: { length: 70, shoulder: 13, chest: 50 },
      M: { length: 75, shoulder: 14, chest: 52 },
      L: { length: 80, shoulder: 15, chest: 54 },
      XL: { length: 85, shoulder: 16, chest: 56 },
      N: { length: 70, shoulder: 13, chest: 50 },
    },
  },
  Pants: {
    component: Pants,
    measures: {
      S: { hem: 18, knee: 24, thigh: 32, waist: 24, length: 92, inseam: 70 },
      M: { hem: 20, knee: 26, thigh: 34, waist: 26, length: 95, inseam: 72 },
      L: { hem: 22, knee: 28, thigh: 36, waist: 28, length: 98, inseam: 74 },
      XL: { hem: 24, knee: 30, thigh: 38, waist: 30, length: 102, inseam: 76 },
      N: { hem: 18, knee: 24, thigh: 32, waist: 24, length: 92, inseam: 70 },
    },
  },
  Coat: {
    component: Coat,
    measures: {
      S: { length: 70, shoulder: 13, chest: 50, arm: 50 },
      M: { length: 75, shoulder: 14, chest: 52, arm: 52 },
      L: { length: 80, shoulder: 15, chest: 54, arm: 54 },
      XL: { length: 85, shoulder: 16, chest: 56, arm: 56 },
      N: { length: 70, shoulder: 13, chest: 50, arm: 50 },
    },
  },
}
export type GarmentMeasurements = Partial<VestProps & PantsProps & CoatProps>
type GarmentComponentProps<T extends GarmentType> = T extends 'Vest'
  ? VestProps
  : T extends 'Pants'
    ? PantsProps
    : T extends 'Coat'
      ? CoatProps
      : never

export const getGarmentComponent = <T extends GarmentType>(
  garmentType: T,
): React.FC<GarmentComponentProps<T>> | undefined => {
  const garment = GARMENT_MEASUREMENTS[garmentType]
  if (!garment) return undefined
  return garment.component as unknown as React.FC<GarmentComponentProps<T>>
}

export const COLORS = ['Black', 'Blue', 'Gray']

export const FABRICS = ['Cotton', 'Polyester', 'Linen']
export const COLOR_ICONS = COLORS.reduce(
  (acc, color) => {
    acc[color] = 'ellipse'
    return acc
  },
  {} as Record<string, string>,
)

export const COLOR_VALUES = {
  Black: '#000000',
  Blue: '#0000FF',
  Gray: '#808080',
} as const
export const FABRIC_ICONS = {
  Cotton: 'leaf',
  Polyester: 'texture',
  Linen: 'leaf-maple',
}
export const BORDER_COLORS = {
  Black: '#444444',
  Blue: '#000080',
  Gray: '#A9A9A9',
} as const
