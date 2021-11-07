import MemberListItem from './MemberListItem';

const MemberList = ({ members }) => {
  return (
    <ul className="MemberList">
      {members.map(member => {
        return <MemberListItem member={member} key={member.username} />
      })}
    </ul>
  )
}

export default MemberList;