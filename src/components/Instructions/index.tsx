import React from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper'

import i18n from '@/language'

import en from './en.json'
import es from './es.json'

i18n.store(en)
i18n.store(es)

interface InstructionsProps {
  images: number[]
  instructions: string[]
  visible: boolean
  closeModal: () => void
}

export const Instructions: React.FC<InstructionsProps> = ({ images, instructions, visible, closeModal }) => {
  const theme = useTheme()
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const nextImage = () => setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length)
  const prevImage = () => setCurrentImageIndex(prevIndex => (prevIndex - 1 + images.length) % images.length)

  React.useEffect(() => {
    if (!visible) setCurrentImageIndex(0)
  }, [visible])

  const currentInstructionKey = instructions[currentImageIndex]

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={[styles.modalContainer, { backgroundColor: theme.colors.background, borderColor: theme.colors.outline }]}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Button icon="close" mode="contained" buttonColor={theme.colors.primary}>
              {i18n.t('close')}
            </Button>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Image source={images[currentImageIndex]} style={styles.image} resizeMode="contain" />
          <Text style={[styles.instructionText, { color: theme.colors.onBackground }]}>
            {i18n.t(currentInstructionKey)}
          </Text>
          <View style={styles.navigationButtons}>
            <Button onPress={prevImage} disabled={currentImageIndex === 0} buttonColor={theme.colors.secondary}>
              {i18n.t('Previous')}
            </Button>
            <Text style={[styles.imageCounter, { color: theme.colors.onBackground }]}>
              {`${currentImageIndex + 1} / ${images.length}`}
            </Text>
            <Button
              onPress={nextImage}
              disabled={currentImageIndex === images.length - 1}
              buttonColor={theme.colors.secondary}
            >
              {i18n.t('Next')}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0.6,
    justifyContent: 'space-between',
    marginTop: '20%',
    borderWidth: 2,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '50%',
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  imageCounter: {
    fontSize: 16,
  },
})
