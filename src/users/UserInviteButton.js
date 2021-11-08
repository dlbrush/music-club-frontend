import { useState } from "react";

const UserInviteButton = ({username, isMember, invited, inviteUser}) => {
  const [ inviting, setInviting ] = useState(false);

  let buttonText = 'Invite';
  if (isMember) {
    buttonText = 'Member';
  } else if (invited) {
    buttonText = 'Invited'
  }

  const onClick = async () => {
    setInviting(true)
    try {
      await inviteUser(username);
    } catch(e) {
      console.error(e);
    }
    setInviting(false);
  }

  return (
    <button className="btn btn-primary" onClick={onClick} disabled={isMember || invited || inviting}>{buttonText}</button>
  )
}

export default UserInviteButton;