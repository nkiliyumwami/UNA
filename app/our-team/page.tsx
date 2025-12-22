import OurTeam from '@/components/Sections/TeamSection'
import React from 'react'
import Team from '@/components/Sections/Team'

const TheTeam = () => {
  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/team.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <Team />
    </div>
  )
}

export default TheTeam
