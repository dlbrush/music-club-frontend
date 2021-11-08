import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/userContext";
import ClubList from "./ClubList";

const MyClubs = () => {
  const { user } = useContext(UserContext);

  return (
    <main className="MyClubs col-md-9 col-lg-10">
      <h1 className="mt-4 border-bottom border-dark pb-2">My Clubs</h1>
      {!user.clubs.length && 
        <p>Looks like you haven't joined any clubs yet! Try looking at the list of <Link to="/public-clubs">public clubs</Link>.</p>
      }
      {user.clubs.length > 0 && 
        <ClubList clubs={user.clubs} />
      }
    </main>
  )
}

export default MyClubs;