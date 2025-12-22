import { ServicesSection } from '@/components/Sections/ServicesSection'
import React from 'react'


const Programs = () => {
    return (
      <div className="">
        <div
          className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url(/programs.jpg)` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        </div>
        <ServicesSection />
      </div>
    )
}

export default Programs