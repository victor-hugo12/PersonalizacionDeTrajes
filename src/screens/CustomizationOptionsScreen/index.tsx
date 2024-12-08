import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PantsCustomOptions } from '@/components/PantsCustomOptions'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { ThemedView } from '@/components/ThemedView'
import { CLOTHES } from '@/constants/selections'
import i18n from '@/language'
import { useAppSelector } from '@/redux/hooks'
import { getSelectedGarment } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const CustomizationOptionsScreen = () => {
  const router = useRouter()
  const selectedGarment = useAppSelector(getSelectedGarment) as CLOTHES

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Customizacion options'} />
      <ScrollView style={styles.body}>
        <Preview />
        {selectedGarment === CLOTHES.Pants && <PantsCustomOptions />}
        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/summary')}>
            {i18n.t('Next')}
          </PaperButton>
        </View>
      </ScrollView>
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
    marginBottom: 5,
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationButton: {
    marginTop: 20,
    marginBottom: 60,
  },
  titleSelect: {
    marginVertical: 8,
  },
})
