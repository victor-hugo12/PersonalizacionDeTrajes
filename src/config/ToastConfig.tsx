import { BaseToast, ErrorToast, InfoToast, ToastProps } from 'react-native-toast-message'

import { BLACK } from '@/constants/colors'

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      text2Style={{
        color: '#333',
      }}
      text2NumberOfLines={3}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      text2Style={{
        color: BLACK,
      }}
      text2NumberOfLines={3}
    />
  ),
  info: (props: ToastProps) => (
    <InfoToast
      {...props}
      text2Style={{
        color: BLACK,
      }}
      text2NumberOfLines={3}
    />
  ),
}
