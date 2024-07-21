'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import axios from 'axios'

interface FormValues {
  email: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
})

const EmailSubscriptionPopup = ({ option }: { option: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const handleOpenPopup = () => {
    setIsOpen(true)
  }

  const handleClosePopup = () => {
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.post('/api/subscribe', data)
      if (res.status === 201) {
        toast.success('You have successfully subscribed to our newsletter.')
        reset()
      } else {
        toast.error('There was an error. Please try again.')
      }
    } catch (err: any) {      
      toast.error(err.response.data.error)
    }
  }

  return (
    <div>
      <a
        href={option}
        onClick={handleOpenPopup}
        className="text-indigo-600 hover:text-indigo-500 font-medium"
      >
        Learn More
      </a>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={handleClosePopup}
          ></div>
          <div className="bg-white rounded-lg p-8 z-10">
            <h2 className="text-2xl font-bold mb-4 items-center flex justify-center">
              Subscribe to Our Newsletter
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <div className="flex justify-center capitalize mb-3 px-2">
                  Stay informed, by subscribing to our newsletter.
                </div>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
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
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailSubscriptionPopup
