'use client'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiMail } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { PhoneIcon } from '@heroicons/react/16/solid'
import axios from 'axios'
import { toast } from 'react-toastify'

interface IFormInput {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
})

const GetInTouch = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {

    try {
      const res = await axios.post('/api/contact', data)
      if (res.status === 200) {
        toast.success('Message sent successfully')
        reset()
      } else {
        toast.error('There was an error. Please try again.')
      }
    } catch (err) {
      toast.error('There was an error. Please try again.')
    }
  }

  return (
    <div className="bg-[#f6f3f3] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-10 space-y-8 md:space-y-0 md:space-x-8">
          <div className="text-center flex-1 border px-3 pt-3 pb-5 bg-white">
            <div className="mb-2 flex justify-center ">
              <FiMail className="h-10 w-10 rounded-full hover:bg-[#4894df8c] p-2" />
            </div>
            <h3 className="text-lg font-medium">Mail Here</h3>
            <div className="flex flex-col">
              <a
                href={`mailto:clarisse@unarwanda.org`}
                className="text-gray-500 hover:text-[#4894DF]"
              >
                Clarisse Ingabire
              </a>
              <a
                href={`mailto:clarisse@unarwanda.org`}
                className="text-gray-500 hover:text-[#4894DF]"
              >
                Jane Kabera
              </a>
            </div>
          </div>

          <div className="text-center flex-1 border p-3 bg-white">
            <div className="mb-2 flex justify-center">
              <HiOutlineLocationMarker className="h-10 w-10 rounded-full hover:bg-[#4894df8c] p-2" />
            </div>
            <h3 className="text-lg font-medium">Visit Here</h3>
            <p className="text-gray-500">KN 72 Street</p>
            <p className="text-gray-500">Kigali, RWANDA</p>
          </div>

          <div className="text-center flex-1 border p-3 bg-white">
            <div className="mb-2 flex justify-center">
              <PhoneIcon className="h-10 w-10 rounded-full hover:bg-[#4894df8c] p-2" />
            </div>
            <h3 className="text-lg font-medium fl">Call Us</h3>
            <div className="flex flex-col">
              <a
                href="tel:+250 788 832 640"
                className="text-gray-500 hover:text-[#4894DF]"
              >
                +250 788 832 640
              </a>
              <a
                href="tel:+250 788 832 640"
                className="text-gray-500 hover:text-[#4894DF]"
              >
                +250 788 832 640
              </a>
            </div>
          </div>
        </div>
        <div className="p-8 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Get In Touch</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
              <div className="flex-1">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0">
              <div className="flex-1">
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="flex-1">
                <label htmlFor="subject" className="sr-only">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject')}
                  className="w-full border-gray-300 rounded-md shadow-sm p-3"
                  placeholder="Subject"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register('message')}
                className="w-full border-gray-300 rounded-md shadow-sm p-3"
                placeholder="Write your message..."
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={`w-full ${
                  Object.keys(errors).length !== 0
                    ? 'bg-blue-300'
                    : 'bg-[#4894DF] hover:bg-[#4a80b6]'
                } text-white py-2 rounded-md px-4 shadow-md`}
                disabled={isSubmitting || Object.keys(errors).length !== 0}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
