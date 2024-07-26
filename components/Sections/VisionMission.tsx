import { BriefcaseIcon, ChartBarIcon } from '@heroicons/react/16/solid'
import VisionMissionCard from '../ui/VisionMissionCard'
import vision from '../../public/VisionIcon.png'
import mission from '../../public/MissionIcon.png'
import Image from 'next/image'

const VisionMission = () => {
  return (
    <div className="pt-12 md:px-5">
      <div className="flex flex-col md:flex-row gap-10">
        <VisionMissionCard
          icon={<Image src={vision} alt="Vision" className="w-16 h-16" />}
          title="Vision"
          description="A Prosperous and Peaceful World, A future where the United Nations is more effective because more Rwandans are engaged global citizens, dedicated to achieving the purpose of the United Nations."
        />
        <VisionMissionCard
          icon={<Image src={mission} alt="Mission" className="w-16 h-16" />}
          title="Mission"
          description="Our mission is to actively champion and advocate for the aims and ideals set forth by the United Nations. Through our initiatives and collaborations, we aim to foster a global environment where cooperation, understanding, and sustainable development thrive."
        />
      </div>
    </div>
  )
}

export default VisionMission
