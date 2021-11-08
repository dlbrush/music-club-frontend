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
      history.push(`/clubs/${invitation.clubId}`);
      addClub(invitation.club);
      removeInvitation(invitation.clubId);
    } catch(e) {
      console.error(e);
      setJoining(false);
    }
  }

  return (
    <li className="InvitationList list-group-item row d-flex" style={{backgroundImage: `url("${invitation.club.backgroundImageUrl}")`}}>
      <div className="InvitationList-left col-8">
        <p>{invitation.username} invited you to</p>
        <p className="h4">{invitation.club.name}</p>
        <p>{invitation.club.description}</p>
      </div>
      <div className="InvitationList-right col-4 mx-auto my-auto">
        <button disabled={joining} onClick={joinClub} className="d-block btn btn-success">Join Club</button>
      </div>
    </li>
  )
}

export default InvitationCard;