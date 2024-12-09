import { generateButtons } from './VestSvg/ButtonsPath'
import { generateLeftVestPath, generateRightVestPath } from './VestSvg/MainBodyPath'
import {
  generateLeftRoundCircularNeckPath,
  generateLeftRoundNeckPath,
  generateLeftRoundZipNeckPath,
  generateNeckPath,
  generateRightRoundCircularNeckPath,
  generateRightRoundNeckPath,
  generateRightRoundZipNeckPath,
  generateZipNeckPath,
} from './VestSvg/Neckpath'
import {
  generateLeftPocketWithButtonPath,
  generateLeftVestPocket,
  generateLeftVestTabPocket,
  generateLeftVestWeltPocket,
  generateRightPocketWithButtonPath,
  generateRightVestPocket,
  generateRightVestTabPocket,
  generateRightVestWeltPocket,
} from './VestSvg/PocketPath'
import {
  generateRightTopPocketButtonPath,
  generateRightTopPocketPath,
  generateRightTopPocketweltPath,
  generateRightTopTabPocket,
} from './VestSvg/PocketTopPath'

export const calculateVest = (
  { length, shoulder, chest }: { length: number; shoulder: number; chest: number },
  containerWidth: number,
  containerHeight: number,
  customOptions: Record<string, string>,
) => {
  const scaleX = containerWidth / 120
  const scaleY = containerHeight / 120
  const startX = 80 * scaleX
  const startY = 30 * scaleY
  const shoulderEndX = startX + shoulder * scaleX
  const shoulderEndY = startY + 4 * scaleX
  const topSideX = startX + (chest * scaleX * 1) / 6 + (chest * scaleX * 1) / 8 + 2 * scaleX
  const topSideY = startY + length * scaleX - 35 * scaleX
  const lowerSideX = topSideX - scaleX
  const lowerSideY = startY + length * scaleX - 4 * scaleY
  const x5 = lowerSideX - (scaleX * chest) / 2
  const y5 = startY + length * scaleX
  const innerEdgeX = x5 - 4 * scaleX
  const bottomInnerEdgeY = startY + length * scaleX - 10 * scaleY
  const topInnerEdgeY = topSideY + 1 * scaleX

  const rightVestPath = generateRightVestPath(
    startX,
    startY,
    shoulderEndX,
    shoulderEndY,
    topSideX,
    topSideY,
    lowerSideX,
    lowerSideY,
    x5,
    y5,
    innerEdgeX,
    bottomInnerEdgeY,
    topInnerEdgeY,
  )

  const xRef = innerEdgeX + 2 * scaleX
  const leftVestPath = generateLeftVestPath(
    startX,
    startY,
    shoulderEndX,
    shoulderEndY,
    topSideX,
    topSideY,
    lowerSideX,
    lowerSideY,
    x5,
    y5,
    innerEdgeX,
    bottomInnerEdgeY,
    topInnerEdgeY,
    xRef,
  )

  const startPocketX = innerEdgeX + 9 * scaleX
  const startPocketY = bottomInnerEdgeY - 4 * scaleX
  let rightVestPocket: string
  let leftVestPocket: string
  const pocketOption2 = customOptions.pocketType
  switch (pocketOption2) {
    case 'Piping and tab':
      rightVestPocket = generateRightVestWeltPocket(startPocketX, startPocketY, scaleX, scaleY)
      leftVestPocket = generateLeftVestWeltPocket(startPocketX, startPocketY, scaleX, scaleY, xRef)
      break

    case 'Piping, tab, and button':
      rightVestPocket = generateRightVestTabPocket(startPocketX, startPocketY, scaleX, scaleY)
      leftVestPocket = generateLeftVestTabPocket(startPocketX, startPocketY, scaleX, scaleY, xRef)
      break
    case 'Flap':
      rightVestPocket = generateRightVestPocket(startPocketX, startPocketY, scaleX, scaleY)
      leftVestPocket = generateLeftVestPocket(startPocketX, startPocketY, scaleX, scaleY, xRef)
      break

    case 'Flap with button':
      rightVestPocket = generateRightPocketWithButtonPath(startPocketX, startPocketY, scaleX, scaleY)
      leftVestPocket = generateLeftPocketWithButtonPath(startPocketX, startPocketY, scaleX, scaleY, xRef)
      break

    default:
      rightVestPocket = generateRightVestWeltPocket(startPocketX, startPocketY, scaleX, scaleY)
      leftVestPocket = generateLeftVestWeltPocket(startPocketX, startPocketY, scaleX, scaleY, xRef)
      break
  }
  const pocketTopX = innerEdgeX + (2 / 3) * (startX - innerEdgeX)
  const pocketTopY = topInnerEdgeY + (2 / 3) * (startY - topInnerEdgeY)
  let rightTopPocket = ''
  const pocketOption3 = customOptions.pocketTopType

  if (customOptions.pocketCount === 'Chest pocket') {
    switch (pocketOption3) {
      case 'Piping and tab':
        rightTopPocket = generateRightTopPocketPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Piping, tab, and button':
        rightTopPocket = generateRightTopTabPocket(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Flap':
        rightTopPocket = generateRightTopPocketweltPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      case 'Flap with button':
        rightTopPocket = generateRightTopPocketButtonPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
      default:
        rightTopPocket = generateRightTopPocketPath(pocketTopX, pocketTopY, scaleX, scaleY)
        break
    }
  }

  const x1reflected = startX - 2 * (startX - innerEdgeX) + 4 * scaleX
  let neck = generateNeckPath(startX, startY, x1reflected, innerEdgeX, topInnerEdgeY, scaleY)
  const neckx1 = innerEdgeX + (5 / 6) * (startX - innerEdgeX)
  const necky1 = topInnerEdgeY + (5 / 6) * (startY - topInnerEdgeY)
  let rightRoundNeck = ''
  let leftRoundNeck = ''
  const roundOption = customOptions.lapel
  if (customOptions.lapel !== 'No lapel') {
    switch (roundOption) {
      case 'Classic lapel':
        neck = generateZipNeckPath(startX, startY, x1reflected, innerEdgeX, topInnerEdgeY, scaleY)
        rightRoundNeck = generateRightRoundZipNeckPath(
          neckx1,
          necky1,
          scaleX,
          scaleY,
          innerEdgeX,
          topInnerEdgeY,
          startX,
          startY,
        )
        leftRoundNeck = generateLeftRoundZipNeckPath(
          xRef,
          neckx1,
          necky1,
          scaleX,
          scaleY,
          innerEdgeX,
          topInnerEdgeY,
          startX,
          startY,
        )
        break
      case 'Peak lapel':
        rightRoundNeck = generateRightRoundNeckPath(startX, startY, scaleX, scaleY, innerEdgeX, topInnerEdgeY)
        leftRoundNeck = generateLeftRoundNeckPath(xRef, startX, startY, scaleX, scaleY, innerEdgeX, topInnerEdgeY)
        break
      case 'Rounded lapel':
        rightRoundNeck = generateRightRoundCircularNeckPath(startX, startY, innerEdgeX, topInnerEdgeY)
        leftRoundNeck = generateLeftRoundCircularNeckPath(xRef, startX, startY, innerEdgeX, topInnerEdgeY)
        break
      default:
        rightRoundNeck = generateRightRoundCircularNeckPath(startX, startY, innerEdgeX, topInnerEdgeY)
        leftRoundNeck = generateLeftRoundCircularNeckPath(xRef, startX, startY, innerEdgeX, topInnerEdgeY)
        break
    }
  }
  const firstButton = bottomInnerEdgeY - 1 * scaleY
  const lastButton = topInnerEdgeY + 1 * scaleY
  const buttonsOption = customOptions.buttons
  let numButtons = 3

  switch (buttonsOption) {
    case '3 buttons':
      numButtons = 3
      break
    case '4 buttons':
      numButtons = 4
      break
    case '5 buttons':
      numButtons = 5
      break
    default:
      numButtons = 3
  }
  const buttons = generateButtons(numButtons, firstButton, lastButton, scaleX, innerEdgeX)
  return {
    rightVestPath,
    leftVestPath,
    rightVestPocket,
    leftVestPocket,
    buttons,
    neck,
    rightTopPocket,
    rightRoundNeck,
    leftRoundNeck,
  }
}
