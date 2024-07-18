import * as yup from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'

const donationValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Email address is invalid')
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .test('phone', 'Phone number is invalid', (value) => {
      if (!value) return false
      return isValidPhoneNumber(value)
    }),
  streetAddress: yup.string().required('Street address is required'),
  city: yup.string().required('City is required'),
  province: yup.string().required('Province/State is required'),
  postalCode: yup.string().required('Postal/Zip Code is required'),
  country: yup.string().required('Country is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .min(1, 'Amount must be at least $1')
    .required('Amount is required'),
  message: yup.string(),
})

export default donationValidationSchema
