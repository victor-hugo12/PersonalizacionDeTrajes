import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { CLOTHES, CLOTHES_OPTIONS } from '@/constants/selections'
import { useLanguage } from '@/context/LanguageContext'
import { setSelectedGarment } from '@/redux/selections/selections.actions'
import { getSelectedGarment } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const SelectionScreen = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { language } = useLanguage()

  const selectedGarment = useSelector(getSelectedGarment) as CLOTHES

  const handleSelection = (option: string) => {
    const garmentType = option as CLOTHES
    dispatch(setSelectedGarment(garmentType))
  }

  return (
    <ThemedView key={language} style={styles.container}>
      <CustomAppBar title={'Choice of garment'} backAction={false} />

      <View style={styles.body}>
        <Preview />
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your garment')}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <SelectionGroupButton options={CLOTHES_OPTIONS} onSelect={handleSelection} selected={selectedGarment} />
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
