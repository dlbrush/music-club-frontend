import { Link } from 'react-router-dom';
import './css/Splash.css';

const Splash = () => {

  return (
    <main className="Splash col-md-9 col-lg-10">
      <div className="Splash-banner d-flex align-items-center justify-content-center">
        <h2 className="Splash-text p-2 display-2 text-white d-flex text-center">Share. Discuss. Discover.</h2>
      </div>
      <article className="my-3">
        <h3 className="text-center">Recommend and discuss albums with anyone, anywhere.</h3>
        <p className="lead mt-3 px-md-3 text-center">Music Club allows you to share and talk about the albums you're listening to. A music club is like a book club - share something you think others should listen to, and talk about it together! Join a club that shares your interests, or start your own and invite your friends.</p>
        <p className="lead mt-3 px-md-3 text-center"><Link to="/register">Register to get started.</Link></p>
        <p className="lead mt-3 px-md-3 text-center"><Link to="/guide">Learn how it works.</Link></p>
        <p className="mt-3 px-md-3 text-center"><small>Designed by Devlin Brush.</small></p>
      </article>
    </main>
  )
}

export default Splash;