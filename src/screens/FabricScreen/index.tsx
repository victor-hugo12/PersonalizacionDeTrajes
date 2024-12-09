import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from 'src/language'

import { CustomAppBar } from '@/components/CustomAppBar'
import { PaperButton } from '@/components/PaperButton'
import { Preview } from '@/components/Preview'
import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { ThemedView } from '@/components/ThemedView'
import { COLORS_OPTIONS, FABRICS_OPTIONS } from '@/constants/selections'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { resetColor, setSelectedColor, setSelectedFabric } from '@/redux/selections/selections.actions'
import { getSelectedColor, getSelectedFabric } from '@/redux/selections/selections.selectors'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

export const FabricScreen = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const selectedColor = useAppSelector(getSelectedColor)
  const selectedFabric = useAppSelector(getSelectedFabric)

  const handleColorSelection = (option: string) => {
    dispatch(setSelectedColor(option))
  }

  const handleFabricSelection = (option: string) => {
    dispatch(setSelectedFabric(option))
    dispatch(resetColor())
  }

  return (
    <ThemedView style={styles.container}>
      <CustomAppBar title={'Fabric and Color Selection'} backAction={true} />
      <View style={styles.body}>
        <Preview />
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your fabric')}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <SelectionGroupButton options={FABRICS_OPTIONS} onSelect={handleFabricSelection} selected={selectedFabric} />
        </View>
        <View style={styles.titleSelect}>
          <Text variant="titleLarge">{i18n.t('Select your color')}</Text>
        </View>
        <View style={styles.selectionContainer}>
          <SelectionGroupButton options={COLORS_OPTIONS} onSelect={handleColorSelection} selected={selectedColor} />
        </View>
        <View style={styles.flexGrow} />
        <View style={styles.navigationButton}>
          <PaperButton mode="contained" dark onPress={() => router.push('/(auth)/(tabs)/customization')}>
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
    marginBottom: 10,
  },
  selectionContainer: {
    marginVertical: 16,
  },
  previewContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
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
