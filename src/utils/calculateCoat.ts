import { generateLeftArmPath, generateRightArmPath } from './CoatSvg/ArmPath'
import { generateButtons } from './CoatSvg/ButtonsPath'
import { generateLeftCoatPath, generateRightCoatPath } from './CoatSvg/MainBodyPath'
import {
  generateLeftRoundCircularNeckPath,
  generateLeftRoundNeckPath,
  generateLeftRoundZipNeckPath,
  generateNeckPath,
  generateRightRoundCircularNeckPath,
  generateRightRoundNeckPath,
  generateRightRoundZipNeckPath,
  generateZipNeckPath,
} from './CoatSvg/NeckPath'
import {
  generateLeftPocketPath,
  generateLeftPocketWithButtonPath,
  generateLeftTabPocket,
  generateLeftWeltPocketPath,
  generateRightPocketPath,
  generateRightPocketWithButtonPath,
  generateRightTabPocket,
  generateRightWeltPocketPath,
} from './CoatSvg/PocketPath'
import {
  generateRightTopPocketButtonPath,
  generateRightTopPocketPath,
  generateRightTopPocketweltPath,
  generateRightTopTabPocket,
} from './CoatSvg/PocketTopPath'

export const calculateCoat = (
  {
    length,
    shoulder,
    chest,
    arm,
  }: {
    length: number
    shoulder: number
    chest: number
    arm: number
  },
  containerWidth: number,
  containerHeight: number,
  customOptions: Record<string, string>,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const startX = 80 * scaleX
  const startY = 30 * scaleY
  const shoulderendX = startX + shoulder * scaleX
  const shoulderendY = startY + 4 * scaleX
  const sideCurveStartX = startX + (chest * scaleX) / 6 + (chest * scaleX) / 8 + 6 * scaleX
  const sideCurveStartY = startY + (scaleY * length) / 3
  const sideCurveEndX = sideCurveStartX - scaleX
  const sideCurveEndY = startY + length * scaleY
  const bottomEdgeX = sideCurveEndX - (scaleX * chest) / 2 + 4 * scaleX
  const bottomEdgeY = startY + length * scaleY
  const innerEdgeX = bottomEdgeX - 9 * scaleX
  const bottomInnerEdgeY = startY + length * scaleY - 10 * scaleX
  const topInnerEdgeY = startY + (scaleY * length) / 2

  const rightCoatPath = generateRightCoatPath(
    startX,
    startY,
    shoulderendX,
    shoulderendY,
    sideCurveStartX,
    sideCurveEndX,
    sideCurveStartY,
    sideCurveEndY,
    bottomEdgeX,
    bottomEdgeY,
    innerEdgeX,
    bottomInnerEdgeY,
    topInnerEdgeY,
  )
  const xRef = innerEdgeX + 2 * scaleX
  const leftCoatPath = generateLeftCoatPath(
    xRef,
    startX,
    startY,
    shoulderendX,
    shoulderendY,
    sideCurveStartX,
    sideCurveEndX,
    sideCurveStartY,
    sideCurveEndY,
    bottomEdgeX,
    bottomEdgeY,
    innerEdgeX,
    bottomInnerEdgeY,
    topInnerEdgeY,
  )
  const sidepocketX = sideCurveEndX
  const sidepocketY = bottomInnerEdgeY - 4 * scaleY
  const pocketTopX = innerEdgeX + (2 / 3) * (startX - innerEdgeX)
  const pocketTopY = topInnerEdgeY + (2 / 3) * (startY - topInnerEdgeY)

  let rightTopPocket = ''
  const pocketOption3 = customOptions.pocketTopType
  if (customOptions.pocketCount === 'Chest pocket') {
    switch (pocketOption3) {
      case 'Piping and tab':
        rightTopPocket = generateRightTopPocketweltPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Piping, tab, and button':
        rightTopPocket = generateRightTopTabPocket(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Flap':
        rightTopPocket = generateRightTopPocketPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Flap with button':
        rightTopPocket = generateRightTopPocketButtonPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      default:
        rightTopPocket = generateRightTopPocketPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
    }
  }

  let rightPocket: string
  let leftPocket: string
  const pocketOption2 = customOptions.pocketType

  switch (pocketOption2) {
    case 'Piping and tab':
      rightPocket = generateRightWeltPocketPath(sidepocketX, sidepocketY, scaleX, scaleY)
      leftPocket = generateLeftWeltPocketPath(xRef, sidepocketX, sidepocketY, scaleX, scaleY)
      break

    case 'Piping, tab, and button':
      rightPocket = generateRightTabPocket(sidepocketX, sidepocketY, scaleX, scaleY)
      leftPocket = generateLeftTabPocket(xRef, sidepocketX, sidepocketY, scaleX, scaleY)
      break

    case 'Flap':
      rightPocket = generateRightPocketPath(sidepocketX, sidepocketY, scaleX, scaleY)
      leftPocket = generateLeftPocketPath(xRef, sidepocketX, sidepocketY, scaleX, scaleY)
      break

    case 'Flap with button':
      rightPocket = generateRightPocketWithButtonPath(sidepocketX, sidepocketY, scaleX, scaleY)
      leftPocket = generateLeftPocketWithButtonPath(xRef, sidepocketX, sidepocketY, scaleX, scaleY)
      break
    default:
      rightPocket = generateRightWeltPocketPath(sidepocketX, sidepocketY, scaleX, scaleY)
      leftPocket = generateLeftWeltPocketPath(xRef, sidepocketX, sidepocketY, scaleX, scaleY)
      break
  }
  const startXreflected = startX - 2 * (startX - innerEdgeX) + 4 * scaleX

  let rightRoundNeck = ''
  let leftRoundNeck = ''
  const roundOption = customOptions.lapel
  const neckx1 = innerEdgeX + (5 / 6) * (startX - innerEdgeX)
  const necky1 = topInnerEdgeY + (5 / 6) * (startY - topInnerEdgeY)
  const curveControl1X = (startX + startXreflected) / 2
  const curveControl1Y = startY - 2 * scaleY
  let neck = generateNeckPath(
    startX,
    startY,
    curveControl1X,
    curveControl1Y,
    startXreflected,
    innerEdgeX,
    topInnerEdgeY,
  )
  if (customOptions.lapel !== 'No lapel') {
    switch (roundOption) {
      case 'Classic lapel':
        neck = generateZipNeckPath(
          startX,
          startY,
          curveControl1X,
          curveControl1Y,
          startXreflected,
          scaleY,
          innerEdgeX,
          topInnerEdgeY,
        )
        rightRoundNeck = generateRightRoundZipNeckPath(
          neckx1,
          necky1,
          scaleX,
          scaleY,
          startX,
          startY,
          innerEdgeX,
          topInnerEdgeY,
        )
        leftRoundNeck = generateLeftRoundZipNeckPath(
          xRef,
          neckx1,
          necky1,
          scaleX,
          scaleY,
          startX,
          startY,
          innerEdgeX,
          topInnerEdgeY,
        )
        break

      case 'Peak lapel':
        neck = generateNeckPath(
          startX,
          startY,
          curveControl1X,
          curveControl1Y,
          startXreflected,
          innerEdgeX,
          topInnerEdgeY,
        )
        rightRoundNeck = generateRightRoundNeckPath(startX, startY, scaleX, scaleY, innerEdgeX, topInnerEdgeY)
        leftRoundNeck = generateLeftRoundNeckPath(xRef, startX, startY, scaleX, scaleY, innerEdgeX, topInnerEdgeY)
        break

      case 'Rounded lapel':
        rightRoundNeck = generateRightRoundCircularNeckPath(startX, startY, innerEdgeX, topInnerEdgeY)
        leftRoundNeck = generateLeftRoundCircularNeckPath(xRef, startX, startY, innerEdgeX, topInnerEdgeY)
        break

      default:
        rightRoundNeck = ''
        leftRoundNeck = ''
        break
    }
  } else {
    rightRoundNeck = ''
    leftRoundNeck = ''
  }

  let numButtons = 3
  const buttonsOption = customOptions.buttons
  switch (buttonsOption) {
    case '1 button':
      numButtons = 1
      break
    case '2 buttons':
      numButtons = 2
      break
    case '3 buttons':
      numButtons = 3
      break
    default:
      numButtons = 3
  }
  const buttons = generateButtons(innerEdgeX, bottomInnerEdgeY, topInnerEdgeY, scaleX, scaleY, numButtons)

  const endArmX1 = sideCurveStartX + 14 * scaleX
  const endArmY1 = shoulderendY + arm * scaleX
  const endArmX2 = endArmX1 - 12 * scaleX
  const endArmY2 = shoulderendY + arm * scaleX + 4 * scaleX
  const armBaseX = shoulderendX - 12 * scaleX
  const armBaseY = shoulderendY + 4 * scaleX
  const rightArm = generateRightArmPath(
    shoulderendX,
    shoulderendY,
    endArmX1,
    endArmY1,
    endArmX2,
    endArmY2,
    armBaseX,
    armBaseY,
  )

  const leftArm = generateLeftArmPath(
    xRef,
    shoulderendX,
    shoulderendY,
    endArmX1,
    endArmY1,
    endArmX2,
    endArmY2,
    armBaseX,
    armBaseY,
  )

  return {
    rightCoatPath,
    leftCoatPath,
    rightPocket,
    leftPocket,
    buttons,
    neck,
    rightRoundNeck,
    leftRoundNeck,
    rightArm,
    leftArm,
    rightTopPocket,
  }
}
