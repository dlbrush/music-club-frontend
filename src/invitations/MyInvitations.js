import { useContext } from "react";
import UserContext from "../contexts/userContext";
import InvitationList from "./InvitationList";

const MyInvitations = () => {
  const { user } = useContext(UserContext);
  return (
    <main className="RecentPosts col-md-9 col-lg-10">
      <h1 className="mt-4 border-bottom border-dark pb-2">Invitations</h1>
      <InvitationList invitations={user.invitations} />
    </main>
  )
}

export default MyInvitations;