import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

import ClubNav from "./ClubNav";
import UserContext from "../contexts/userContext";

import API from '../api';

const ClubContainer = ({ clubId, ContentComponent }) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ club, setClub ] = useState({});
  const user = useContext(UserContext);
  let isMember = false;
  if (!loading) {
    isMember = Boolean(club.members.find(member => member.username === user.username));
  }
  
  useEffect(() => {
    const getClub = async () => {
      try {
        const club = await API.getClub(clubId);
        console.log(club);
        setClub(club);
      } catch(e) {
        console.warn(e);
        setError(true);
      }
      setLoading(false);
    }
    getClub();
  }, [clubId]);

  const joinClub = async () => {
    try {
      setLoading(true);
      await API.joinClub(user.username, club.id);
      setClub(club => {
        club.members.push(user);
        return club;
      })
    } catch(e) {
      console.warn(e);
    }
    setLoading(false);
  }

  // Show loading screen until loading is finished
  if (loading) {
    return <h1 className="col-md-9 col-lg-10">Loading club...</h1>
  }
  // Redirect to home if loading fails
  if (error) {
    return <Redirect to='/'/>
  }
  return (
    <main className="PublicClubsView col-md-9 col-lg-10">
      <img src={club.bannerImgUrl} alt="Club banner"/>
      <h1 className="mt-4 pb-2">
        {club.name}
      </h1>
      {!isMember &&
        <button onClick={joinClub} className="btn btn-success mb-3">Join Club</button>
      }
      <ClubNav club={club} isMember={isMember}/>
      <ContentComponent club={club}/>
    </main>
  )
}

export default ClubContainer;