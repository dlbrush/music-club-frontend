import './Header.css';

const Header = () => {
  // Some extra styling around the header here - the goal is a colored dot between the two words
  return (
    <header className="Header mt-4 border-bottom border-dark">
      <a className="Header-link display-3 fw-bold mb-0 text-reset" href='/'>
        MUSIC
        <span className="text-primary">
          .
        </span>
        CLUB
      </a>
    </header>
  )
}

export default Header;