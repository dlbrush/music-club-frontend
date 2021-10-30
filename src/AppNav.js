import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from './contexts/userContext';

const AppNav = () => {
  const user = useContext(UserContext);

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
          </ul>
        }
        {user && 
          <ul className="list-group list-group-flush">
            <NavLink className="list-group-item list-group-item-action" exact to='/'>
              Recent
            </NavLink>
          </ul>
        }
    </nav>
  )
}

export default AppNav;