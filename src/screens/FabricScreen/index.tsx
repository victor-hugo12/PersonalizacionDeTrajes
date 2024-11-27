import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { WHITE } from '@/constants/colors'
import { darkenColor } from '@/constants/colorUtils'
import {
  COLOR_ICONS,
  COLOR_VALUES,
  COLORS,
  FABRIC_ICONS,
  FABRICS,
  GarmentProps,
  GarmentType,
  getGarmentComponent,
} from '@/constants/selections'
import { resetColor, setSelectedColor, setSelectedFabric } from '@/redux/selections/selections.actions'
import {
  getCustomMeasurements,
  getSelectedColor,
  getSelectedFabric,
  getSelectedGarment,
} from '@/redux/selections/selections.selectors'
import { RootState } from '@/redux/store'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const FabricScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const selectedColor = useSelector(getSelectedColor)
  const selectedFabric = useSelector(getSelectedFabric)
  const garmentType = useSelector(getSelectedGarment) as GarmentType
  const garmentMeasurements = useSelector(state => getCustomMeasurements(state as RootState, garmentType))

  const SelectedGarmentComponent = getGarmentComponent(garmentType)

  const fillColor = selectedColor ? COLOR_VALUES[selectedColor as keyof typeof COLOR_VALUES] : WHITE
  const strokeColor = darkenColor(fillColor, 0.4)

  // Combinar propiedades específicas y comunes
  const garmentProps: GarmentProps = {
    ...(garmentMeasurements as unknown as GarmentProps), // Aseguramos que tenga las propiedades necesarias
    width: 300,
    height: 300,
    fillColor,
    strokeColor,
  }

  const handleColorSelection = (option: string) => {
    dispatch(setSelectedColor(option))
  }

  const handleFabricSelection = (option: string) => {
    dispatch(setSelectedFabric(option))
    dispatch(resetColor())
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Fabric and Color Selection')} backAction={true} />
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: WHITE }]}>
            {SelectedGarmentComponent ? <SelectedGarmentComponent {...garmentProps} /> : null}
          </View>
        </View>

        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your color')}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <SelectionGroupButton
            key={`color-${selectedColor}`}
            options={COLORS}
            onSelect={handleColorSelection}
            selected={selectedColor}
            icons={COLOR_ICONS}
            colors={COLOR_VALUES}
          />
        </View>
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your fabric')}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <SelectionGroupButton
            options={FABRICS}
            onSelect={handleFabricSelection}
            selected={selectedFabric}
            icons={FABRIC_ICONS}
          />
        </View>
        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/home')}>
            {i18n.t('Next')}
          </PaperButton>
        </View>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 25,
  },
  selectionContainer: {
    marginVertical: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
    aspectRatio: 1,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationButton: {
    marginTop: 20,
  },
  titleSelect: {
    marginVertical: 8,
  },
})
