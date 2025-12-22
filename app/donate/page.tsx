import DonationForm from "@/components/forms/DonationForm";


export default function Home() {
  return (
    <div>
      <div
        className="py-32 h-[256px] bg-center bg-cover bg-no-repeat relative"
        style={{ backgroundImage: `url(/donate.jpeg)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>
      <DonationForm />
    </div>
  )
}
