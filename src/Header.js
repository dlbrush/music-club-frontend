import './Header.css';

import UserContext from './contexts/userContext';

import { useContext } from 'react';

const Header = () => {
  const { user } = useContext(UserContext);

  // Some extra styling around the header here - the goal is a colored dot between the two words
  return (
    <header className="Header mt-4 border-bottom border-dark d-flex justify-content-between">
      <a className="Header-link display-3 fw-bold mb-0 text-reset" href='/'>
        MUSIC
        <span className="text-primary">
          .
        </span>
        CLUB
      </a>
      {user && <p className="Header-user">Logged in as {user.username}</p>}
    </header>
  )
}

export default Header;