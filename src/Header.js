import './Header.css';

const Header = () => {
  // Some extra styling around the header here - the goal is a colored dot between the two words
  return (
    <header className="Header border-bottom border-dark">
      <h1 className="display-3 fw-bold mt-4 mb-0">
        <a className="Header-link text-reset" href='/'>
          MUSIC
          <span className="text-primary">
            .
          </span>
          CLUB
        </a>
      </h1>
    </header>
  )
}

export default Header;