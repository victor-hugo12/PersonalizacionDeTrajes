import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import i18n from 'src/language'

import { SelectionGroupButton } from '@/components/SelecctionGroupButton'
import { BUTTON_OPTIONS_VEST, LAPEL_OPTIONS, POCKET_OPTIONS, THIRD_POCKET_OPTIONS } from '@/constants/selections'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { updateCustomOptions } from '@/redux/selections/selections.actions'
import { getCustomOptions } from '@/redux/selections/selections.selectors'

export const VestCustomOptions = () => {
  const dispatch = useAppDispatch()

  const customOption = useAppSelector(getCustomOptions)

  const handleSelection = (key: string, value: string) => {
    dispatch(updateCustomOptions({ key, value }))
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Buttons')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={BUTTON_OPTIONS_VEST}
          onSelect={value => handleSelection('buttons', value)}
          selected={customOption.buttons}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Chest pocket')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={THIRD_POCKET_OPTIONS}
          onSelect={value => handleSelection('pocketCount', value)}
          selected={customOption.pocketCount}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Pocket type')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={POCKET_OPTIONS}
          onSelect={value => handleSelection('pocketType', value)}
          selected={customOption.pocketType}
          multiline={true}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Top pocket type')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={POCKET_OPTIONS}
          onSelect={value => handleSelection('pocketTopType', value)}
          selected={customOption.pocketTopType}
          multiline={true}
        />
      </View>
      <View style={styles.titleSelect}>
        <Text variant="titleMedium">{i18n.t('Lapel')}</Text>
      </View>
      <View style={styles.selectionContainer}>
        <SelectionGroupButton
          options={LAPEL_OPTIONS}
          onSelect={value => handleSelection('lapel', value)}
          selected={customOption.lapel}
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
