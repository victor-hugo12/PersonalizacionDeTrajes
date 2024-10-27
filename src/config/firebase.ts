import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID })
