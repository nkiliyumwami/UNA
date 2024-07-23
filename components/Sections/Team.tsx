'use client'
import React, { useEffect, useState } from 'react'
import Profile from '../ui/Profile'
import axios from 'axios'
import Loading from '../ui/Loading'

const Team: React.FC = () => {
  const [showBoardMembers, setShowBoardMembers] = useState(false)
  const [leaderShipTeam, setLeaderShipTeam] = useState<any[]>([])
  const [boardMembers, setBoardMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeam()
  }, [])

  const fetchTeam = async () => {
    const res = await axios.get('/api/team')
    setLeaderShipTeam(res.data.teams.leadership)
    setBoardMembers(res.data.teams.board)
    setLoading(false)
  }

  return (
    <div className="container mx-auto md:px-28 px-6 py-8">
      <h2 className="text-3xl tracking-wide text-center mb-4 font-bold">
        Our Team
      </h2>
      <h3 className="text-[1.5rem] font-light tracking-[0.3px] leading-[1.22] mb-5">
        Leadership Team
      </h3>
      {loading
        ? <Loading/>
        : leaderShipTeam.map((member, index) => (
            <Profile
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              description={member.description}
              email={member.email}
              linkedin={member.linkedin}
            />
          ))}
      <h3
        className="text-[1.5rem] font-light tracking-[0.3px] leading-[1.22] my-5"
        onClick={() => setShowBoardMembers(!showBoardMembers)}
      >
        Board Members
      </h3>
      {showBoardMembers ? (
        loading ? (
          <Loading/>
        ) : (
          <>
            {boardMembers.map((member, index) => (
              <Profile
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
                email={member.email}
                linkedin={member.linkedin}
              />
            ))}
            <h4
              className="text-[#4894DF] underline pt-3"
              onClick={() => setShowBoardMembers(!showBoardMembers)}
            >
              Hide Board Members
            </h4>
          </>
        )
      ) : (
        <h4
          className="text-[#4894DF] underline"
          onClick={() => setShowBoardMembers(!showBoardMembers)}
        >
          Click to see Board Members
        </h4>
      )}
    </div>
  )
}

export default Team
