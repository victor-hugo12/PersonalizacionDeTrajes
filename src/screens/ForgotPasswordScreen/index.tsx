import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar, HelperText, IconButton, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import i18n from 'src/language'

import { PaperButton } from '@/components/PaperButton'
import { ThemedView } from '@/components/ThemedView'
import { useLoading } from '@/context/LoaderContext'
import { sendResetEmail } from '@/services/firebaseAuth'

import en from './en.json'
import es from './es.json'
import { ForgotSchema } from './schema'

i18n.store(en)
i18n.store(es)

interface FormValues {
  email: string
}

export const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter()
  const loader = useLoading()

  const onSubmit = async (values: FormValues) => {
    try {
      loader.setLoading(true)
      await sendResetEmail(values.email)
      loader.setLoading(true)
      Toast.show({
        text1: i18n.t('An email was sent, in 5 seconds you will redirect to the login screen'),
        type: 'info',
        visibilityTime: 5000,
      })
      setTimeout(() => {
        router.replace('/login')
        loader.setLoading(false)
      }, 5000)
    } catch (ex) {
      console.info('ex', ex)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageView}>
        <Avatar.Icon size={120} icon="lock-question" />
      </View>
      <View style={styles.viewText}>
        <Text variant="displayMedium" style={styles.textAlign}>
          {i18n.t('FORGOT PASSWORD')}
        </Text>
        <Text style={styles.textAlign}>
          {i18n.t(`Provide your account's email for which you want to reset the password!`)}
        </Text>
      </View>
      <Formik validationSchema={ForgotSchema} initialValues={{ email: '' }} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, dirty }) => (
          <>
            <View style={styles.inputView}>
              <TextInput
                label={i18n.t('Email')}
                mode="outlined"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                left={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <HelperText type="error" visible={touched.email && Boolean(errors.email)}>
                  {i18n.t(errors.email)}
                </HelperText>
              )}
            </View>
            <View style={styles.paddingView}>
              <PaperButton mode="contained" onPress={() => handleSubmit()} dark disabled={!dirty || !isValid}>
                {i18n.t('Send')}
              </PaperButton>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.return}>
        <IconButton icon="arrow-left-bold" size={40} onPress={() => router.back()} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
  },
  imageView: {
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 20,
  },
  imageStyle: {
    height: 200,
    width: 300,
  },
  inputView: {
    height: 80,
  },
  registerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingView: {
    paddingBottom: 20,
  },
  return: {
    alignItems: 'center',
  },
  viewText: {
    paddingBottom: 30,
  },
  textAlign: {
    textAlign: 'center',
  },
})
