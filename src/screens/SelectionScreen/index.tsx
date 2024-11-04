import { router } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { WHITE } from '@/constants/colors'
import { CLOTHES, GarmentType, getGarmentImage } from '@/constants/selections'
import { setSelectedGarment } from '@/redux/selections/selections.actions'
import { getSelectedGarment } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const SelectionScreen = () => {
  const dispatch = useDispatch()
  const selectedGarment = useSelector(getSelectedGarment)

  const handleSelection = (option: string) => {
    dispatch(setSelectedGarment(option))
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={i18n.t('Choice of garment')} backAction={false} />

      <View style={styles.body}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageWrapper, { backgroundColor: WHITE }]}>
            <Image source={getGarmentImage(selectedGarment as GarmentType)} style={styles.image} resizeMode="contain" />
          </View>
        </View>

        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your garment')}</Text>
        </View>

        <View style={styles.selectionContainer}>
          <SelectionGroupButton
            options={CLOTHES.map(garment => garment)}
            onSelect={handleSelection}
            selected={selectedGarment}
          />
        </View>
        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/measurement')}>
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
  },
  imageWrapper: {
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 400,
    height: 400,
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
