import DonationForm from "@/components/forms/DonationForm";
import bgImage from "../../public/donate.jpeg";


export default function Home() {
  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <DonationForm />
    </div>
  )
}
