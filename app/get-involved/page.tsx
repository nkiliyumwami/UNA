"use client";

import { HeartIcon, UserIcon } from "@heroicons/react/16/solid";
import { RiMailLine } from "react-icons/ri";
import React, { useState } from "react";
import bgImage from "../../public/getinvolved.jpeg";
import EmailSubscriptionPopup from "@/components/ui/EmailSubscriptionPopup";
import GetInvolvedForm from "@/components/forms/GetInvolvedForm";

const GetInvolved = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"membership" | "volunteering">("membership");

  const handleOpenPopup = (title: any) => {
    setType(title);
    setIsOpen(true);
  };
  const involvementOptions = [
    // {
    //   title: 'Volunteer',
    //   description:
    //     'Join our team of volunteers and make a difference in your community.',
    //   icon: UserIcon,
    //   link: '#',
    // },
    {
      title: "Become one of us",
      description: "Support our mission by becoming one of us.",
      icon: UserIcon,
      link: "#",
    },
    {
      title: "Subscribe",
      description: "Stay updated by subscribing to our newsletter.",
      icon: RiMailLine,
      link: "#",
    },
  ];
  return (
    <div>
      <main className=" bg-white">
        <div
          className="pt-36 h-[256px] bg-center bg-cover bg-no-repeat relative"
          style={{ backgroundImage: `url(${bgImage.src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        </div>

        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center w-full h-full relative z-10 ">
              <h1 className="pt-3 text-center mb-4 font-bold tracking-wide  text-3xl">
                Membership & Involvement
              </h1>
              <p className="text-center mb-12 ">
                Explore different ways to get involved and support our mission.
              </p>
            </div>
            <div className="flex justify-center gap-8">
              {involvementOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <option.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-xl font-semibold text-center mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-4">
                    {option.description}
                  </p>
                  {option.title === "Become one of us" ||
                  option.title === "Volunteer" ? (
                    <button
                      onClick={() => {
                        handleOpenPopup(option.title);
                      }}
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                    >
                      Learn More
                    </button>
                  ) : (
                    <EmailSubscriptionPopup option={option.link} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <GetInvolvedForm type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
    </div>
  );
};

export default GetInvolved;
