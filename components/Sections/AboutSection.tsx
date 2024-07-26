import Image from 'next/image'
import React from 'react'
import SDGs from '../../public/SDGs.png'
import VisionMission from './VisionMission'

export const AboutSection = () => {
  return (
    <div className="md:py-32 py-10">
      <div className="w-full md:mx-auto px-10 md:px-24 ">
        <div className="md:flex-row justify-center w-full flex items-center flex-col">
          <div className="flex-shrink-0 flex-grow-0 md:w-5/12 px-3">
            <Image
              src={SDGs.src}
              width={400}
              height={80}
              alt="UNA-RWANDA"
              className="w-full -mt-3"
            />
          </div>
          <div className=" md:w-7/12 px-3">
            <div className="md:pl-[30px]">
              {/* <span className="uppercase mb-2 text-[#1273eb] leading-7 ">About us</span> */}
              <h2 className="mb-4 tracking-wide md:text-3xl text-2xl font-bold">
                Who We are
              </h2>

              {/* <h4 className="text-[22px] mb-2 font-semibold">Our History</h4> */}
              <p className="leading-7 text-[15px] text-[#646464]">
                The United Nations Association Rwanda (UNA-RWANDA) is dedicated to
                transformative change, focusing on achieving the Sustainable
                Development Goals (SDGs), with an emphasis on eradicating
                poverty, fostering peace, addressing climate change, and
                protecting the environment. We promote diversity, equity, and
                inclusion, striving for a world where everyone thrives and
                contributes to a brighter future. <br />
                <br />
                UNA-RWANDA offers programs in knowledge dissemination, human rights
                promotion, peace and conflict resolution. We are part of a
                global network of UNAs, coordinated by the World Federation of
                United Nations Associations (WFUNA), active in over 100
                countries. Join us in building a more inclusive and prosperous
                world for current and future generations.
              </p>
            </div>
          </div>
        </div>
        <VisionMission />
      </div>
    </div>
  )
}
