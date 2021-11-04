import '../css/MemberListItem.css';

const MemberListItem = ({ member }) => {
  return (
    <li className="">
        <img className="MemberListItem-profile" src={member.profileImgUrl} alt=""/>
      {member.username}
    </li>
  )
}

export default MemberListItem;