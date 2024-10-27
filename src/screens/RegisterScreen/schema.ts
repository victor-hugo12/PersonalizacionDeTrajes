import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter valid email').required('Email address is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  passwordConfirmation: yup
    .string()
    .required('Please retype your password')
    .oneOf([yup.ref('password')], 'Your passwords do not match'),
})
