import React from 'react'
import { GestureResponderEvent, Image, Modal, StyleSheet, View } from 'react-native'
import { Button, IconButton, Text, useTheme } from 'react-native-paper'

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
  const handleBackgroundPress = () => {
    closeModal()
  }

  const handleModalPress = (event: GestureResponderEvent) => {
    event.stopPropagation()
    return true
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay} onStartShouldSetResponder={() => true} onResponderRelease={handleBackgroundPress}>
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.colors.background, borderColor: theme.colors.outline },
          ]}
          onStartShouldSetResponder={handleModalPress}
        >
          <View style={styles.header}>
            <IconButton
              icon="close"
              size={24}
              onPress={closeModal}
              style={styles.closeButton}
              iconColor={theme.colors.primary}
            />
          </View>
          <View style={styles.content}>
            <Image source={images[currentImageIndex]} style={styles.image} resizeMode="contain" />
            <Text style={[styles.instructionText, { color: theme.colors.onBackground }]}>
              {i18n.t(currentInstructionKey)}
            </Text>
            <View style={styles.navigationButtons}>
              <Button
                onPress={prevImage}
                disabled={currentImageIndex === 0}
                mode="outlined"
                style={styles.navButton}
                textColor={theme.colors.secondary}
              >
                {i18n.t('Previous')}
              </Button>
              <Text style={[styles.imageCounter, { color: theme.colors.onBackground }]}>
                {`${currentImageIndex + 1} / ${images.length}`}
              </Text>
              <Button
                onPress={nextImage}
                disabled={currentImageIndex === images.length - 1}
                mode="outlined"
                style={styles.navButton}
                textColor={theme.colors.secondary}
              >
                {i18n.t('Next')}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  navButton: {
    marginHorizontal: 5,
  },
})
