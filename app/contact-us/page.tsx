import React from "react";
import GetInTouch from "@/components/ui/GetinTouch";

const Contact = () => {
  return (
    <div className="">
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/contact-us.webp)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-0"></div>
      </div>
      <GetInTouch />
    </div>
  );
};

export default Contact;
