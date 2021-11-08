import UserInviteButton from './UserInviteButton';

const UserSearchResultItem = ({ user, invite, club, inviteUser, invitations }) => {
  const isMember = Boolean(club.members.find(member => member.username === user.username));
  const invited = Boolean(invitations.find(invitation => invitation.username === user.username));

  return (
    <li className="UserSearchResultItem list-group-item row d-flex">
      <div className="UserSearchResultItem-profile-img col-2">
        <img className="img-fluid" src={user.profileImgUrl} alt="" />
      </div>
      <div className="UserSearchResultItem-name col-7 text-center">
        {user.username}
      </div>
      <div className="UserSearchResultItem-invite col-3 text-center">
        {invite && <UserInviteButton username={user.username} isMember={isMember} invited={invited} inviteUser={inviteUser} />}
      </div>  
    </li>
  )
}

export default UserSearchResultItem;