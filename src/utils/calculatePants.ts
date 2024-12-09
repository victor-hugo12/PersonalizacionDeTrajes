import {
  generateLeftPocketbackPath,
  generateLeftTabPocketbackPath,
  generateLeftZipPocketbackPath,
  generateLeftZipPocketButtonbackPath,
  generateRightPocketbackPath,
  generateRightTabPocketbackPath,
  generateRightZipPocketbackPath,
  generateRightZipPocketButtonbackPath,
} from './PantsSvg/BackPocket'
import { generateClosureButtonPath, generateClosurePath } from './PantsSvg/ClosurePath'
import { generateLeftCreasePath, generateRightCreasePath } from './PantsSvg/CreasePath'
import { generateLeftPantsPath, generateRightPantsPath } from './PantsSvg/MainBodyPath'
import {
  generateLeftPocketCircularPath,
  generateLeftPocketLPath,
  generateLeftPocketPath,
  generateRightPocketCircularPath,
  generateRightPocketLPath,
  generateRightPocketPath,
} from './PantsSvg/PocketPath'
import { generateWaistbandPaths } from './PantsSvg/WaistbandPath'
import { calculateDistance } from './utils'

export const calculatePants = (
  {
    hem,
    knee,
    thigh,
    waist,
    length,
    inseam,
  }: {
    hem: number
    knee: number
    thigh: number
    waist: number
    length: number
    inseam: number
  },
  containerWidth: number,
  containerHeight: number,
  customOptions: Record<string, string>,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  let pocket = 18 * scaleY
  if (length * scaleY - inseam * scaleY - 4 * scaleY > 18 * scaleX) {
    pocket = 18 * scaleY
  } else {
    pocket = length * scaleY - inseam * scaleY - 4 * scaleY
  }
  const innerWaist = 70 * scaleX
  const startX = innerWaist + waist * scaleX
  const startY = 20 * scaleY
  const innerThigh = innerWaist - 1 * scaleX
  const sideThigh = innerThigh + thigh * scaleX
  const thighY = startY + length * scaleY - inseam * scaleY
  const sideknee = sideThigh - ((thigh - knee) / 2) * scaleX
  const innerknee = innerThigh + ((thigh - knee) / 2) * scaleX
  const kneeY = thighY + (inseam / 2 - 5) * scaleY
  const sideHem = sideknee - ((knee - hem) / 2) * scaleX
  const innerHem = innerknee + ((knee - hem) / 2) * scaleX
  const hemY = kneeY + (inseam / 2 + 5) * scaleY

  const pocketstart = startX - 4 * scaleX
  let t = 0.0
  let pocketX, pocketY
  const precision = 0.001

  do {
    pocketX =
      (1 - t) ** 3 * startX +
      3 * (1 - t) ** 2 * t * (sideThigh - (sideThigh - startX) / 2.5) +
      3 * (1 - t) * t ** 2 * sideThigh +
      t ** 3 * sideThigh
    pocketY =
      (1 - t) ** 3 * startY +
      3 * (1 - t) ** 2 * t * (thighY - (thighY - startY) / 1.25) +
      3 * (1 - t) * t ** 2 * (thighY - (thighY - startY) / 2.75) +
      t ** 3 * thighY
    t += precision
  } while (calculateDistance(pocketstart, startY, pocketX, pocketY) < pocket && t <= 1.0)

  const rightPantsPath = generateRightPantsPath(
    startX,
    startY,
    sideThigh,
    thighY,
    sideknee,
    kneeY,
    sideHem,
    hemY,
    innerHem,
    innerknee,
    innerThigh,
    innerWaist,
    scaleX,
    scaleY,
  )

  const leftPantsPath = generateLeftPantsPath(
    startX,
    startY,
    sideThigh,
    thighY,
    sideknee,
    kneeY,
    sideHem,
    hemY,
    innerHem,
    innerknee,
    innerThigh,
    innerWaist,
    scaleX,
    scaleY,
  )
  const { rightWaist, leftWaist } = generateWaistbandPaths(startX, startY, innerWaist, scaleX, scaleY)
  let rightPocketPath: string
  let leftPocketPath: string
  let closure = ''
  if (customOptions.zipper === 'button with zipper') {
    closure = generateClosureButtonPath(innerWaist, startY, innerThigh, thighY, scaleX, scaleY)
  } else {
    closure = generateClosurePath(innerWaist, startY, innerThigh, thighY, scaleX, scaleY)
  }

  const foldOption = customOptions.fold
  let foldValue = 0

  switch (foldOption) {
    case 'clasic':
      foldValue = 0
      break
    case 'with 1':
      foldValue = 1
      break
    case 'with 2':
      foldValue = 2
      break
    case 'with 3':
      foldValue = 3
      break
    default:
      foldValue = 0
  }
  let rightCrease = generateRightCreasePath(innerWaist, startY, innerThigh, thighY, scaleX, scaleY, foldValue)
  let leftCrease = generateLeftCreasePath(innerWaist, startY, innerThigh, thighY, scaleX, scaleY, foldValue)

  const pocketOption2 = customOptions.frontPocket
  switch (pocketOption2) {
    case 'L-shaped':
      rightPocketPath = generateRightPocketLPath(pocketstart, startY, pocketX, pocketY, scaleX, scaleY)
      leftPocketPath = generateLeftPocketLPath(innerWaist, pocketstart, startY, pocketX, pocketY, scaleX, scaleY)
      break

    case 'Diagonal':
      rightPocketPath = generateRightPocketPath(pocketstart, startY, pocketX, pocketY)
      leftPocketPath = generateLeftPocketPath(innerWaist, pocketstart, startY, pocketX, pocketY)
      break

    case 'Rounded':
      rightPocketPath = generateRightPocketCircularPath(pocketstart, startY, pocketX, pocketY)
      leftPocketPath = generateLeftPocketCircularPath(innerWaist, pocketstart, startY, pocketX, pocketY)
      break

    case 'Straight':
      rightPocketPath = generateRightPocketPath(startX, startY, pocketX, pocketY)
      leftPocketPath = generateLeftPocketPath(innerWaist, startX, startY, pocketX, pocketY)
      break

    default:
      rightPocketPath = generateRightPocketPath(pocketstart, startY, pocketX, pocketY)
      leftPocketPath = generateLeftPocketPath(innerWaist, pocketstart, startY, pocketX, pocketY)
      break
  }
  const pocketBackOption = customOptions.backPocket
  if (customOptions.backPocketEnable === 'on') {
    rightCrease = ''
    leftCrease = ''
    closure = ''
    switch (pocketBackOption) {
      case 'Piping and tab':
        rightPocketPath = generateRightPocketbackPath(startX, startY, scaleX, scaleY)
        leftPocketPath = generateLeftPocketbackPath(innerWaist, startX, startY, scaleX, scaleY)
        break
      case 'Flap with button':
        rightPocketPath = generateRightZipPocketButtonbackPath(startX, startY, scaleX, scaleY)
        leftPocketPath = generateLeftZipPocketButtonbackPath(innerWaist, startX, startY, scaleX, scaleY)
        break

      case 'Piping, tab, and button':
        rightPocketPath = generateRightTabPocketbackPath(startX, startY, scaleX, scaleY)
        leftPocketPath = generateLeftTabPocketbackPath(innerWaist, startX, startY, scaleX, scaleY)
        break

      case 'Flap':
        rightPocketPath = generateRightZipPocketbackPath(startX, startY, scaleX, scaleY)
        leftPocketPath = generateLeftZipPocketbackPath(innerWaist, startX, startY, scaleX, scaleY)
        break

      default:
        rightPocketPath = generateRightPocketbackPath(startX, startY, scaleX, scaleY)
        leftPocketPath = generateLeftPocketbackPath(innerWaist, startX, startY, scaleX, scaleY)
        break
    }
  }
  return {
    rightPantsPath,
    leftPantsPath,
    rightPocketPath,
    leftPocketPath,
    closure,
    rightWaist,
    leftWaist,
    rightCrease,
    leftCrease,
  }
}
