import bgImage from "../../public/unHome.png";
import rwun from "../../public/unrw.jpg";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="">
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <div className=" mx-auto py-5 px-8 md:px-24 md:flex items-center justify-between ">
        <div className="my-[20px] md:mx-auto lg:w-[60%] w-full items-center px-3 flex justify-center flex-col">
          <h1 className="md:text-3xl sm:text-2xl xs:text-lg mb-[17px] md:mt-[12px] font-extrabold md:leading-[60px] text-[#4894DF]">
            United Nations Association Rwanda
          </h1>
          <p className="mb-[15px] leading-[29px] md:text-balance md:text-center">
            Empowering Change, Uniting Humanity: The United Nations Association
            Rwanda (UNA-RWANDA) champions the Sustainable Development Goals and
            promotes diversity, equity, and inclusion to create a peaceful and
            prosperous future for all. Join us in our commitment to addressing
            global challenges and building a brighter, more inclusive world for
            current and future generations.
          </p>
          <div className="gap-5 flex">
            <a href="/get-involved">
              <button className="hover:bg-[#4894DF] hover:text-white px-6 py-3 my-[15px] rounded-md capitalize border border-[#4894DF]">
                Membership
              </button>
            </a>
            {/* <a href="/get-involved">
              <button className="hover:bg-[#4894DF] hover:text-white px-6 py-3 my-[15px] rounded-md capitalize border border-[#4894DF]">
                Donate
              </button>
            </a> */}
          </div>
        </div>
        <div className="my-5 w-[40%] px-3 hidden lg:flex">
          <Image
            src={rwun}
            alt="imag"
            width={900}
            height={400}
            className="h-auto align-middle rounded-md"
          />
        </div>
      </div>
      <div
        className=" relative mx-auto py-8 px-8 md:px-24 flex items-center justify-center text-white md:text-3xl text-lg bg-cover"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <p className="z-20 text-center">
          Promoting the Aims and Ideals of the United Nations.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
