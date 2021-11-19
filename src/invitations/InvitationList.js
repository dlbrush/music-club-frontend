import InvitationCard from "./InvitationCard";

const InvitationList = ({ invitations }) =>{
  if (!invitations.length) return <p>No invitations.</p>

  return (
    <ul className="InvitationList list-group">
      {invitations.map(invitation => {
        return <InvitationCard key={`${invitation.sentFrom}, ${invitation.clubId}, ${invitation.username}`} invitation={invitation} />
      })}
    </ul>
  )
}

export default InvitationList;