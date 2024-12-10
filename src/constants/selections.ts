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

export const GARMENT_MEASUREMENTS = {
  Vest: {
    S: { length: 70, shoulder: 13, chest: 50 },
    M: { length: 75, shoulder: 14, chest: 52 },
    L: { length: 80, shoulder: 15, chest: 54 },
    XL: { length: 85, shoulder: 16, chest: 56 },
    N: { length: 70, shoulder: 13, chest: 50 },
  },
  Pants: {
    S: { hem: 18, knee: 24, thigh: 32, waist: 24, length: 92, inseam: 70 },
    M: { hem: 20, knee: 26, thigh: 34, waist: 26, length: 95, inseam: 72 },
    L: { hem: 22, knee: 28, thigh: 36, waist: 28, length: 98, inseam: 74 },
    XL: { hem: 24, knee: 30, thigh: 38, waist: 30, length: 102, inseam: 76 },
    N: { hem: 18, knee: 24, thigh: 32, waist: 24, length: 92, inseam: 70 },
  },
  Coat: {
    S: { length: 70, shoulder: 13, chest: 50, arm: 50 },
    M: { length: 75, shoulder: 14, chest: 52, arm: 52 },
    L: { length: 80, shoulder: 15, chest: 54, arm: 54 },
    XL: { length: 85, shoulder: 16, chest: 56, arm: 56 },
    N: { length: 70, shoulder: 13, chest: 50, arm: 50 },
  },
}

export enum COLORS {
  Black = 'Black',
  Blue = 'Blue',
  Gray = 'Gray',
}

export const COLORS_OPTIONS = [
  {
    value: COLORS.Black,
    icon: 'circle',
    color: '#000000',
    borderColor: '#444444',
  },
  {
    value: COLORS.Blue,
    icon: 'circle',
    color: '#0000FF',
    borderColor: '#000080',
  },
  {
    value: COLORS.Gray,
    icon: 'circle',
    color: '#808080',
    borderColor: '#A9A9A9',
  },
]
export enum FABRICS {
  Cotton = 'Cotton',
  Polyester = 'Polyester',
  Linen = 'Linen',
}

export const FABRICS_OPTIONS = [
  {
    value: FABRICS.Cotton,
    icon: 'leaf',
  },
  {
    value: FABRICS.Polyester,
    icon: 'texture',
  },
  {
    value: FABRICS.Linen,
    icon: 'leaf-maple',
  },
]

export const FOLDS_OPTIONS = [{ value: 'clasic' }, { value: 'with 1' }, { value: 'with 2' }, { value: 'with 3' }]

export const ZIPPER_OPTIONS = [{ value: 'button with zipper' }, { value: 'hook with zipper' }]
export const BACK_POCKETS_ENABLE = [{ value: 'on' }, { value: 'off' }]

export const FRONT_POCKETS_OPTIONS = [
  { value: 'Diagonal' },
  { value: 'Straight' },
  { value: 'L-shaped' },
  { value: 'Rounded' },
]

export const BACK_POCKETS_OPTIONS = [
  { value: 'Piping and tab' },
  { value: 'Piping, tab, and button' },
  { value: 'Flap' },
  { value: 'Flap with button' },
]
export const BUTTON_OPTIONS_VEST = [{ value: '3 buttons' }, { value: '4 buttons' }, { value: '5 buttons' }]

export const BUTTON_OPTIONS_COAT = [{ value: '1 button' }, { value: '2 buttons' }, { value: '3 buttons' }]

export const POCKET_OPTIONS = [
  { value: 'Piping and tab' },
  { value: 'Piping, tab, and button' },
  { value: 'Flap' },
  { value: 'Flap with button' },
]

export const LAPEL_OPTIONS = [
  { value: 'No lapel' },
  { value: 'Classic lapel' },
  { value: 'Peak lapel' },
  { value: 'Rounded lapel' },
]

export const LAPEL_WIDTH_OPTIONS = [{ value: 'Narrow' }, { value: 'Wide' }]

export const THIRD_POCKET_OPTIONS = [{ value: 'Chest pocket' }, { value: 'No chest pocket' }]

export const RIBBON_COLOR_OPTIONS = [{ value: 'Same fabric color' }, { value: 'Different fabric color' }]

export const DEFAULT_OPTIONS_BY_GARMENT: Record<CLOTHES, Record<string, string>> = {
  [CLOTHES.Pants]: {
    fold: FOLDS_OPTIONS[0].value,
    zipper: ZIPPER_OPTIONS[0].value,
    frontPocket: FRONT_POCKETS_OPTIONS[0].value,
    backPocketEnable: BACK_POCKETS_ENABLE[1].value,
    backPocket: BACK_POCKETS_OPTIONS[0].value,
  },
  [CLOTHES.Vest]: {
    buttons: BUTTON_OPTIONS_VEST[0].value,
    pocketCount: THIRD_POCKET_OPTIONS[0].value,
    pocketType: POCKET_OPTIONS[0].value,
    pocketTopType: POCKET_OPTIONS[0].value,
    lapel: LAPEL_OPTIONS[0].value,
  },
  [CLOTHES.Coat]: {
    buttons: BUTTON_OPTIONS_COAT[0].value,
    pocketCount: THIRD_POCKET_OPTIONS[1].value,
    pocketType: POCKET_OPTIONS[0].value,
    pocketTopType: POCKET_OPTIONS[0].value,
    lapel: LAPEL_OPTIONS[1].value,
  },
}
export const imagePantsSets = {
  hem: [require('@/assets/images/hemCoatVest2.png'), require('@/assets/images/hemCoatVest2.png')],
  knee: [require('@/assets/images/kneePants.png'), require('@/assets/images/kneePants.png')],
  thigh: [require('@/assets/images/thighPants.png'), require('@/assets/images/thighPants.png')],
  waist: [require('@/assets/images/waistPants.png'), require('@/assets/images/waistPants.png')],
  length: [require('@/assets/images/lenghtPants1.png'), require('@/assets/images/lenghtPants2.png')],
  inseam: [require('@/assets/images/shotPants1.png'), require('@/assets/images/shotPants3.png')],
}

export const instructionPantsSets = {
  hem: ['measure_hem_1', 'measure_hem_2'],
  knee: ['measure_knee_1', 'measure_knee_2'],
  thigh: ['measure_thigh_1', 'measure_thigh_2'],
  waist: ['measure_waist_1', 'measure_waist_2'],
  length: ['measure_length_pants1', 'measure_length_pants2'],
  inseam: ['measure_inseam_1', 'measure_inseam_2'],
}
export const imageSets = {
  length: [
    require('@/assets/images/lenghtCoat1.png'),
    require('@/assets/images/lenghtCoat2.png'),
    require('@/assets/images/lenghtCoat3.png'),
  ],
  shoulder: [require('@/assets/images/ShoulderCoatVest1.png'), require('@/assets/images/ShoulderCoatVest2.png')],
  chest: [require('@/assets/images/ChestCoatVest.png'), require('@/assets/images/ChestCoatVest.png')],
  arm: [require('@/assets/images/ArmCoatVest1.png'), require('@/assets/images/ArmCoatVest2.png')],
}

export const instructionSets = {
  length: ['measure_length_1', 'measure_length_2', 'measure_length_2'],
  shoulder: ['measure_shoulder_1', 'measure_shoulder_2'],
  chest: ['measure_chest_1', 'measure_chest_2'],
  arm: ['measure_arm_1', 'measure_arm_2'],
}
