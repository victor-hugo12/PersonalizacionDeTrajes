import authModule, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const auth = authModule()

export const signUp = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
  return await auth.createUserWithEmailAndPassword(email, password)
}

export const signInUser = async (email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> => {
  return await auth.signInWithEmailAndPassword(email, password)
}

export const signOutUser = async (): Promise<void> => {
  return await auth.signOut()
}

export const validateEmail = async (user: FirebaseAuthTypes.User) => {
  return await user.sendEmailVerification()
}

export const sendResetEmail = async (email: string) => {
  return await auth.sendPasswordResetEmail(email)
}

export const signInWithGoogle = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = authModule.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return await auth.signInWithCredential(googleCredential)
}
