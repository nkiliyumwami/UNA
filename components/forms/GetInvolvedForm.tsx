import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'

interface FormValues {
  firstname: string
  lastname: string
  email: string
  address: string
  phone: string
  type: 'membership' | 'volunteering'
}

// Define validation schema
const schema = yup.object().shape({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
  type: yup
    .string()
    .oneOf(['membership', 'volunteering'], 'Invalid type')
    .required('Type is required'),
})

interface GetInvolvedFormProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  type: 'membership' | 'volunteering'
}

const GetInvolvedForm: React.FC<GetInvolvedFormProps> = ({
  isOpen,
  setIsOpen,
  type,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const handleClosePopup = () => {
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.post('/api/get-involved', data)
      if (res.status === 200) {
        toast.success('Your enquiry has been sent!')
        reset()
      } else {
        toast.error('There was an error. Please try again.')
      }
    } catch (err) {
      toast.error('There was an error. Please try again.')
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={handleClosePopup}
          ></div>
          <div className="bg-white rounded-lg p-8 z-10">
            <h2 className="text-2xl font-bold mb-4 items-center flex justify-center">
              Get Involved
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 flex gap-4">
                <div>
                  <label htmlFor="firstname" className="block mb-2">
                    Firstname:
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    {...register('firstname')}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastname" className="block mb-2">
                    Lastname:
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    {...register('lastname')}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Type:</label>
                <select
                  {...register('type')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="membership">Membership</option>
                  <option value="volunteering">Volunteering</option>
                </select>
                {errors.type && (
                  <p className="text-red-500">{errors.type.message}</p>
                )}
              </div>
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    isSubmitting
                      ? 'bg-blue-300'
                      : 'bg-[#4894DF] hover:bg-[#4a80b6]'
                  } text-white py-2 rounded-md px-4 shadow-md`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default GetInvolvedForm
