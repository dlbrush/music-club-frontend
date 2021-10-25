import { NavLink } from 'react-router-dom';

const AppNav = () => {
  return (
    <nav className="AppNav flex-column col-md-3 col-lg-2">
      <ul className="list-group list-group-flush">
        <NavLink className="list-group-item list-group-item-action" exact to='/'>
          Home
        </NavLink>
        <NavLink className="list-group-item list-group-item-action" exact to='/login'>
          Log in
        </NavLink>
      </ul>
    </nav>
  )
}

export default AppNav;