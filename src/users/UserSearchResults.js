import UserSearchResultItem from './UserSearchResultItem';

const UserSearchResults = ({ users, club, invitations, inviteUser }) => {
  return (
    <ul className="list-group col-8 mx-auto">
      {users.map(user => {
        return <UserSearchResultItem key={user.username} user={user} invite={true} club={club} invitations={invitations} inviteUser={inviteUser}/>
      })}
    </ul>
  )
}

export default UserSearchResults;