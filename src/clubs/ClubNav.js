import { NavLink } from 'react-router-dom'

const ClubNav = ({ club, isMember }) => {
  return (
    <nav className="ClubNav list-group list-group-horizontal text-center">
      <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/posts`}>
        Posts
      </NavLink>
      <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/members`}>
        Members
      </NavLink>
      {isMember && 
        <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/new-post`}>
        New Post
        </NavLink>
      }
    </nav>
  )
};

export default ClubNav;