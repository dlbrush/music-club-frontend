import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import API from "../api";
import ClubList from "./ClubList";

const MyClubs = ({ username }) => {
  const [ userData, setUserData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Get user based on userName
    const getUserData = async () => {
      try {
        const userResponse = await API.getUser(username);
        setUserData(userResponse);
      } catch (e) {
        console.error(e);
        history.push('/');
      }
      setLoading(false);
    }
    getUserData();
  }, [ username, history ]);

  if (loading) return <h1 className="col-md-9 col-lg-10">Loading clubs...</h1>

  return (
    <main className="MyClubs col-md-9 col-lg-10">
      <h1 className="mt-4 border-bottom border-dark pb-2">My Clubs</h1>
      <ClubList clubs={userData.clubs} />
    </main>
  )
}

export default MyClubs;