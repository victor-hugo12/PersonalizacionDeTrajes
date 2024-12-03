import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useLoading } from 'src/context/LoaderContext'
import i18n from 'src/language'

import { PaperButton } from '@/components/PaperButton'
import { ThemedView } from '@/components/ThemedView'
import { signUp, validateEmail } from '@/services/firebaseAuth'
import { addUser } from '@/services/firestoreUser'

import en from './en.json'
import es from './es.json'
import { RegisterSchema } from './schema'

i18n.store(en)
i18n.store(es)

interface FormValues {
  email: string
  name: string
  password: string
}

export const RegisterScreen: React.FC = () => {
  const router = useRouter()
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState<boolean>(true)
  const loader = useLoading()

  const onSubmit = async (values: FormValues) => {
    try {
      loader.setLoading(true)
      const { user }: FirebaseAuthTypes.UserCredential = await signUp(values.email, values.password)
      await addUser(user.uid, { name: values.name })
      await validateEmail(user)
      loader.setLoading(false)
    } catch (ex) {
      const error = ex as Error
      let errorMessage = error.message
      if (error.message.includes('auth/email-already-in-use')) {
        errorMessage = 'The email address is already in use by another account'
      }
      Toast.show({
        text1: i18n.t('Error'),
        text2: i18n.t(errorMessage),
        type: 'error',
        visibilityTime: 5000,
      })
    } finally {
      loader.setLoading(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageView}>
        <Image source={require('@/assets/images/login.png')} style={styles.imageStyle} />
      </View>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{ name: '', email: '', password: '', passwordConfirmation: '' }}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, dirty }) => (
          <>
            <View style={styles.inputView}>
              <TextInput
                label={i18n.t('Name')}
                mode="outlined"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                left={<TextInput.Icon icon="account" />}
              />
              {touched.name && errors.name && (
                <HelperText type="error" visible={touched.name && Boolean(errors.name)}>
                  {i18n.t(errors.name)}
                </HelperText>
              )}
            </View>
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
            <View style={styles.inputView}>
              <TextInput
                label={i18n.t('Password')}
                mode="outlined"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={hidePassword ? 'eye-off' : 'eye'}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
              />
              {touched.password && errors.password && (
                <HelperText type="error" visible={touched.password && Boolean(errors.password)}>
                  {i18n.t(errors.password)}
                </HelperText>
              )}
            </View>
            <View style={styles.inputView}>
              <TextInput
                label={i18n.t('Confirm password')}
                mode="outlined"
                onChangeText={handleChange('passwordConfirmation')}
                onBlur={handleBlur('passwordConfirmation')}
                value={values.passwordConfirmation}
                secureTextEntry={hidePasswordConfirmation}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={hidePasswordConfirmation ? 'eye-off' : 'eye'}
                    onPress={() => setHidePasswordConfirmation(!hidePasswordConfirmation)}
                  />
                }
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
                <HelperText type="error" visible={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}>
                  {i18n.t(errors.passwordConfirmation)}
                </HelperText>
              )}
            </View>
            <View style={styles.paddingView}>
              <PaperButton mode="contained" onPress={() => handleSubmit()} dark disabled={!dirty || !isValid}>
                {i18n.t('Sign up')}
              </PaperButton>
            </View>
          </>
        )}
      </Formik>
      <View style={styles.signInView}>
        <Text>{i18n.t('Already have an account?')}</Text>
        <Button mode="text" onPress={() => router.push('/login')}>
          {i18n.t('Sign in')}
        </Button>
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
    paddingBottom: 20,
  },
  imageStyle: {
    height: 120,
    width: 200,
  },
  inputView: {
    height: 80,
  },
  signInView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingView: {
    paddingBottom: 20,
  },
  forgot: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  forgotButton: {
    width: 180,
  },
})
