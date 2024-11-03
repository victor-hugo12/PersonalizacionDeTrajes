import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { GarmentType, getGarmentImage, MEASUREMENTS, SIZE_DIMENSIONS, SizeType } from '@/constants/selections'
import { setSelectedMeasure } from '@/redux/selections/selections.actions'
import { getSelectedGarment, getSelectedMeasure } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const MeasurementScreen = () => {
  const dispatch = useDispatch()
  const garmentType = useSelector(getSelectedGarment)
  const size = useSelector(getSelectedMeasure)
  const { width, height } = SIZE_DIMENSIONS[size as SizeType]

  const handleSelection = (option: string) => {
    dispatch(setSelectedMeasure(option))
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Adjust Measurements')} backAction={true} />
      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: 'white' }]}>
            <Image
              source={getGarmentImage(garmentType as GarmentType)}
              style={{ width, height }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select Standard Size')}</Text>
        </View>
        <SelectionGroupButton options={MEASUREMENTS} onSelect={handleSelection} selected={size} />
        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton dark mode="contained">
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
    position: 'relative',
  },
  titleSelect: {
    marginVertical: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  imageWrapper: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationButton: {},
})
