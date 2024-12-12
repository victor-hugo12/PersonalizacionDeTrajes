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
import { signInUser, signInWithGoogle } from '@/services/firebaseAuth'
import { addUser } from '@/services/firestoreUser'

import en from './en.json'
import es from './es.json'
import { LoginSchema } from './schema'

i18n.store(en)
i18n.store(es)

interface FormValues {
  email: string
  password: string
}

export const LoginScreen: React.FC = () => {
  const router = useRouter()
  const [hidePassword, setHidePassword] = useState<boolean>(true)
  const loader = useLoading()

  const onSubmit = async (values: FormValues) => {
    try {
      loader.setLoading(true)
      await signInUser(values.email, values.password)
    } catch (ex: unknown) {
      const error = ex as Error
      let errorMessage = error.message
      if (error.message.includes('auth/user-not-found') || error.message.includes('auth/invalid-login')) {
        errorMessage = 'auth/user-not-found'
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

  const signGoogle = async () => {
    try {
      loader.setLoading(true)
      const { user }: FirebaseAuthTypes.UserCredential = await signInWithGoogle()
      await addUser(user.uid, { name: user.displayName as string })
    } catch (ex) {
      console.info('error ', ex)
    } finally {
      loader.setLoading(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageView}>
        <Image source={require('@/assets/images/login.png')} style={styles.imageStyle} />
      </View>
      <Formik validationSchema={LoginSchema} initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty, touched }) => (
          <View>
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
            <View style={styles.forgot}>
              <Button mode="text" onPress={() => router.push('/forgot')} style={styles.forgotButton}>
                {i18n.t('Forgot your password')}
              </Button>
            </View>
            <View style={styles.paddingView}>
              <PaperButton mode="contained" onPress={() => handleSubmit()} dark disabled={!dirty || !isValid}>
                {i18n.t('Sign in')}
              </PaperButton>
            </View>
          </View>
        )}
      </Formik>
      <View style={styles.paddingView}>
        <PaperButton
          mode="outlined"
          icon={({ size }) => (
            <Image source={require('@/assets/images/google.png')} style={{ width: size, height: size }} />
          )}
          disabled={false}
          onPress={async () => await signGoogle()}
          dark
        >
          {i18n.t('Sign in with Google')}
        </PaperButton>
      </View>
      <View style={styles.registerView}>
        <Text>{i18n.t(`Don't have an account?`)}</Text>
        <Button mode="text" onPress={() => router.push('/register')}>
          {i18n.t('Sign up')}
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
  forgot: {
    paddingBottom: 10,
    alignItems: 'center',
  },
  forgotButton: {
    width: '100%',
  },
})
