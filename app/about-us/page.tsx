import Image from "next/image";
import React from "react";

const AboutSection = () => {
  return (
    <div className="">
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-0"></div>
      </div>
      <div className="py-16">
        <div className="w-full md:mx-auto px-8 md:px-24">
          <div className="gap-10 items-center">
            <div className="flex justify-center">
              <Image
                src="/SDGs.png"
                width={500}
                height={500}
                alt="UNA-RWANDA"
                className="rounded-lg shadow-lg w-auto h-auto"
              />
            </div>
            <div>
              <h2 className="mb-6 tracking-wide md:text-4xl text-2xl font-bold text-gray-900 dark:text-gray-100">
                Who We Are
              </h2>
              <p className="leading-8 text-[17px] text-gray-700 mb-5">
                The <strong>United Nations Association Rwanda (UNA-RWANDA) stands as a proud member of the global family of United Nations Associations, operating under the coordination of the World Federation of United Nations Associations (WFUNA), which unites over 100 countries worldwide.</strong>
              </p>
              <p className="leading-8 text-[17px] text-gray-700 mb-5">
                Our mission is to actively champion and advocate for the aims and ideals set forth by the United Nations.
              </p>
              <p className="leading-8 text-[17px] text-gray-700 mb-5">Our Longtime Focus Areas:</p>
              <ul>
                <li className="leading-8 text-[17px] text-gray-700 mb-2 list-disc list-inside">Information, Training, and Resource Centre</li>
                <li className="leading-8 text-[17px] text-gray-700 mb-2 list-disc list-inside">Human and People Rights</li>
                <li className="leading-8 text-[17px] text-gray-700 mb-2 list-disc list-inside">School-Net</li>
                <li className="leading-8 text-[17px] text-gray-700 mb-2 list-disc list-inside">UN Association Elders League</li>
              </ul>
              <p className="leading-8 text-[17px] text-gray-700 mb-5">
                UNA-RWANDA is part of a global network coordinated by the <a href="https://www.wfuna.org/" target="_blank" className="text-blue-500 underline">WFUNA</a>, active in over 100 countries.
              </p>
              <div className="mt-8">
                <a href="/get-involved" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-sm font-medium">Become a member</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
