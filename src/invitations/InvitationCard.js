import { useHistory } from "react-router";
import { useContext, useState } from "react";
import API from "../api";
import UserContext from "../contexts/userContext";

const InvitationCard = ({ invitation }) => {
  const [ joining, setJoining ] = useState(false);
  const history = useHistory();
  const { addClub, removeInvitation } = useContext(UserContext);

  const joinClub = async () => {
    setJoining(true);
    try {
      await API.joinClub(invitation.username, invitation.clubId);
      addClub(invitation.club);
      removeInvitation(invitation.clubId);
      history.push(`/clubs/${invitation.clubId}`);
    } catch(e) {
      console.error(e);
      setJoining(false);
    }
  }

  const cardStyle = {
    backgroundImage: `url("${invitation.club.bannerImgUrl}")`,
    'backgroundSize': '100%'
  };
  const contentStyle = {
    "backgroundColor": "rgba(255, 255, 255, 0.7)"
  }

  return (
    <li className="InvitationList list-group-item my-1" style={cardStyle}>
      <div className="flex-row d-flex justify-content-between align-items-center p-2" style={contentStyle}>  
        <div className="InvitationList-left">
          <div className="mt-3">
            <p className="bg-dark p-1 text-white d-inline-block">{invitation.sentFrom} invited you to</p>
          </div>
          <div className="mb-1">
            <p className="h4 bg-dark p-1 text-white d-inline-block">{invitation.club.name}</p>
          </div>
          <div>
            <p className="bg-dark p-1 text-white d-inline-block">{invitation.club.description}</p>
          </div>
        </div>
        <div className="InvitationList-right">
          <button disabled={joining} onClick={joinClub} className="d-block btn btn-success btn-lg">Join Club</button>
        </div>
      </div>
    </li>
  )
}

export default InvitationCard;