import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { CoatCustomOptions } from '@/components/CoatCustomOptions'
import { CustomAppBar } from '@/components/CustomAppBar'
import { PantsCustomOptions } from '@/components/PantsCustomOptions'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { ThemedView } from '@/components/ThemedView'
import { VestCustomOptions } from '@/components/VestCustomOptions'
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
      <View style={styles.body}>
        <Preview />
        <ScrollView style={styles.options}>
          {selectedGarment === CLOTHES.Pants && <PantsCustomOptions />}
          {selectedGarment === CLOTHES.Vest && <VestCustomOptions />}
          {selectedGarment === CLOTHES.Coat && <CoatCustomOptions />}
          <View style={styles.flexGrow} />
          <View style={styles.navigationButton}>
            <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/summary')}>
              {i18n.t('Next')}
            </PaperButton>
          </View>
        </ScrollView>
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
  options: {
    flex: 1,
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
