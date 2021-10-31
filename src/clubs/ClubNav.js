import { NavLink } from 'react-router-dom'

const ClubNav = ({ club }) => {
  return (
    <nav className="ClubNav list-group list-group-horizontal">
      <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/posts`}>
        Posts
      </NavLink>
      <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/members`}>
        Members
      </NavLink>
      <NavLink className="list-group-item list-group-item-action" exact to={`/clubs/${club.id}/new-post`}>
        New Post
      </NavLink>
    </nav>
  )
};

export default ClubNav;