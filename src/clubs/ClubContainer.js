import { useEffect, useState } from "react";
import { Redirect } from "react-router";

import ClubNav from "./ClubNav";

import API from '../api';

const ClubContainer = ({ clubId, ContentComponent }) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ club, setClub ] = useState({});
  
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
      <h1 className="border-bottom border-dark mt-4 pb-2">
        {club.name}
      </h1>
      <ClubNav club={club}/>
      <ContentComponent club={club}/>
    </main>
  )
}

export default ClubContainer;