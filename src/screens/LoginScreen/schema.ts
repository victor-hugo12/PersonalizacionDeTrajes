import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email address is required'),
  password: yup.string().required('Password is required'),
})
