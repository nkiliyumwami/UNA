'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import profile from '../../public/profile.png'


type ProfileProps = {
  name: string
  role: string
  image: any
  description: string
  email: string
  linkedin: string
}

const countSentences = (text: string) => {
  return text.split(/\.|\?|!/).filter(Boolean).length
}

const getFirstTwoSentences = (text: string) => {
  const sentences = text.split(/(?<=[.?!])\s+/).filter(Boolean)
  return sentences.slice(0, 2).join(' ') + (sentences.length > 2 ? '...' : '')
}

const Profile: React.FC<ProfileProps> = ({
  name,
  role,
  image,
  description,
  email,
  linkedin,
}) => {
  const [showMore, setShowMore] = useState(false)
  const totalSentences =
    countSentences(description) +
    countSentences(
      `If you would like to contact ${
        name.split(' ')[0]
      } directly, email ${email} or connect on LinkedIn.`
    )
  const shouldShowMoreButton = totalSentences > 2
  const briefDescription = getFirstTwoSentences(description)

  return (
    <div className="md:flex-row flex-col flex  items-start space-x-4 py-4 border-b w-auto border-gray-300">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover object-left-top"
        />
      ) : (
        <Image
          src={profile}
          alt={name}
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover object-left-top"
        />
      )}

      <div className="flex-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500 mb-2">{role}</p>
        {description === '' ? (
          ''
        ) : (
          <p className="text-gray-700">
            {showMore ? description : briefDescription}
          </p>
        )}

        <p className="mt-2 text-gray-600">
          If you would like to contact {name.split(' ')[0]} directly, email{' '}
          <a
            href={`mailto:${email}`}
            className="font-bold text-gray-500 underline"
          >
            {email}
          </a>{' '}
          or connect on{' '}
          <a
            href={linkedin}
            target="_blank"
            className="font-bold text-gray-500"
          >
            LinkedIn
          </a>
          .
        </p>
        {shouldShowMoreButton && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-2 text-blue-500 text-[14px]"
          >
            {showMore ? '- Show less' : '+ Show more'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Profile
