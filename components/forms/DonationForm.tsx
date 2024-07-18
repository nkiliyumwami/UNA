'use client'

import axios from 'axios'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CurrencyInput from 'react-currency-input-field'
import donationValidationSchema from '@/lib/validation/donationValidation'
import { toast } from 'react-toastify'

interface IFormInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
  country: string
  amount: number
  message?: string
}

const DonationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(donationValidationSchema),
  })
  
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      
      const res = await axios.post('/api/send-email', data)
      if (res.status === 200) {
        toast.success('Your donation enquiry has been sent!')
        // alert('Your donation enquiry has been sent!')
        reset()
      } else {
        toast.error('There was an error. Please try again.')
        // alert('There was an error. Please try again.')
      }
    } catch (err) {
      toast.error('There was an error. Please try again.')
      // alert('There was an error. Please try again.')
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-8 my-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-white shadow-md rounded-md w-full"
      >
        <h2 className="w-full text-3xl tracking-wide text-center mb-4 font-bold">
          Donate
        </h2>
        <div>
          <p className="text-gray-700 mb-4">
            Please fill in the form below to make a donation enquiry. We will
            get back to you as soon as possible.
          </p>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              {...register('firstName')}
              placeholder="Enter your first name"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.firstName ? 'border-red-500' : ''
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              {...register('lastName')}
              placeholder="Enter your last name"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.lastName ? 'border-red-500' : ''
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter your email address"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                {...field}
                defaultCountry="US"
                placeholder="Enter phone number"
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Street Address</label>
          <input
            type="text"
            {...register('streetAddress')}
            placeholder="Enter your street address"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              errors.streetAddress ? 'border-red-500' : ''
            }`}
          />
          {errors.streetAddress && (
            <p className="text-red-500 text-sm">
              {errors.streetAddress.message}
            </p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              {...register('city')}
              placeholder="Enter your city"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.city ? 'border-red-500' : ''
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">Province/State</label>
            <input
              type="text"
              {...register('province')}
              placeholder="Enter your province/state"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.province ? 'border-red-500' : ''
              }`}
            />
            {errors.province && (
              <p className="text-red-500 text-sm">{errors.province.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">Postal/Zip Code</label>
            <input
              type="text"
              {...register('postalCode')}
              placeholder="Enter your postal/zip code"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.postalCode ? 'border-red-500' : ''
              }`}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
          <div className="mb-4 w-[47%]">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              {...register('country')}
              placeholder="Enter your country"
              className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                errors.country ? 'border-red-500' : ''
              }`}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <CurrencyInput
            id="input-example"
            name="amount"
            placeholder="Enter amount"
            prefix="$"
            decimalsLimit={2}
            onValueChange={(value) => {
              const parsedValue = parseFloat(value || '')
              if (!isNaN(parsedValue) && parsedValue > 0) {
                setValue('amount', parsedValue, { shouldValidate: true })
              } else {
                setValue('amount', 0, { shouldValidate: true })
              }
            }}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              errors.amount ? 'border-red-500' : ''
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <CurrencyInput
            id="input-example"
            name="amount"
            placeholder="Enter amount"
            prefix="$"
            min={1}
            decimalsLimit={2}
            // onValueChange={(value) => setValue('amount', parseFloat(value||''))}
            onValueChange={(value, name, values) => {
              setValue('amount', parseFloat(value || ''))
              console.log(value, name, values)
            }}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              errors.amount ? 'border-red-500' : ''
            }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div> */}
        <div className="mb-4">
          <label className="block text-gray-700">Additional Information</label>
          <textarea
            {...register('message')}
            placeholder="Enter your message here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className={`w-full ${
            Object.keys(errors).length !== 0 ? 'bg-blue-300' : 'bg-blue-500'
          } text-white py-2 rounded-md`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default DonationForm
