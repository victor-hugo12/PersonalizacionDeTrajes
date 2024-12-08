import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from 'src/language'

import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { BACK_POCKETS_OPTIONS, FOLDS_OPTIONS, FRONT_POCKETS_OPTIONS, ZIPPER_OPTIONS } from '@/constants/selections'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateCustomOptions } from '@/redux/selections/selections.actions'
import { getCustomOptions } from '@/redux/selections/selections.selectors'

export const PantsCustomOptions = () => {
  const dispatch = useAppDispatch()

  const customOption = useAppSelector(getCustomOptions)

  const handleSelection = (key: string, value: string) => {
    dispatch(updateCustomOptions({ key, value }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Folds')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={FOLDS_OPTIONS}
          onSelect={value => handleSelection('fold', value)}
          selected={customOption.fold}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Zipper')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={ZIPPER_OPTIONS}
          onSelect={value => handleSelection('zipper', value)}
          selected={customOption.zipper}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Front pockets')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={FRONT_POCKETS_OPTIONS}
          onSelect={value => handleSelection('frontPocket', value)}
          selected={customOption.frontPocket}
          multiline={true}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Back pockets')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={BACK_POCKETS_OPTIONS}
          onSelect={value => handleSelection('backPocket', value)}
          selected={customOption.backPocket}
          multiline={true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectionContainer: {
    marginBottom: 5,
  },
  titleSelect: {
    marginVertical: 8,
  },
})
