import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import UserContext from './contexts/userContext';
import LogoutButton from './auth/LogoutButton';

const AppNav = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  let badgeColor;
  if (user) {
    badgeColor = user.invitations.length > 0 ? 'danger' : 'secondary';
  }
  return (
    <nav className="AppNav flex-column col-md-3 col-lg-2">
        {!user && 
          <ul className="list-group list-group-flush">
            <NavLink className="list-group-item list-group-item-action" exact to='/'>
              Home
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to='/login'>
              Log in
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to='/register'>
              Register
            </NavLink>
          </ul>
        }
        {user && 
          <ul className="list-group list-group-flush">
            <NavLink className="list-group-item list-group-item-action" exact to='/recent'>
              Recent
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to={`/users/${user.username}/clubs`}>
              My Clubs
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to={`/users/${user.username}/invitations`}>
              Invitations  <span class={`badge bg-${badgeColor} pt-1 pb-1 ms-2`}>{user.invitations.length}</span>
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to='/public-clubs'>
              Public Clubs
            </NavLink>
            <NavLink className="list-group-item list-group-item-action" exact to='/new-club'>
              Start a Club
            </NavLink>
            <LogoutButton />
          </ul>
        }
    </nav>
  )
}

export default AppNav;