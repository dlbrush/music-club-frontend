import MemberList from '../members/MemberList'

const ClubMembers = ({ club }) => {
  return (
    <section className="ClubMembers">
      <h3 className="mt-4 text-center">Members</h3>
      <MemberList members={club.members}/>
    </section>
  )
}

export default ClubMembers;