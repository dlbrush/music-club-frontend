import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

import '../css/ClubContainer.css';

import ClubNav from "./ClubNav";
import UserContext from "../contexts/userContext";

import API from '../api';

const ClubContainer = ({ clubId, ContentComponent }) => {

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ club, setClub ] = useState({});
  const [ isMember, setIsMember ] = useState(false);
  const [ isFounder, setIsFounder ] = useState(false);
  const { user, addClub, removeInvitation, editUserClub, deleteUserClub } = useContext(UserContext);

  const foundedDate = new Date(club.founded);
  
  useEffect(() => {
    const getClub = async () => {
      try {
        const club = await API.getClub(clubId);
        setClub(club);
        setIsMember(Boolean(club.members.find(member => member.username === user.username)));
        setIsFounder(club.founder === user.username);
      } catch(e) {
        console.warn(e);
        setError(true);
      }
      setLoading(false);
    }
    getClub();
  }, [clubId, user]);

  const joinClub = async () => {
    setLoading(true);
    try {
      await API.joinClub(user.username, club.id);
      setClub(club => {
        club.members.push(user);
        return club;
      });
      addClub(club);
      removeInvitation(club.id);
    } catch(e) {
      console.warn(e);
    }
    setLoading(false);
  }

  const editClub = async (clubData) => {
    setLoading(true);
    try {
      const editedClub = await API.editClub(club.id, clubData);
      setClub(editedClub);
      editUserClub(editedClub);
    } catch(e) {
      console.warn(e);
    }
    setLoading(false);
  }

  const deleteClub = async () => {
    try {
      await API.deleteClub(club.id);
      deleteUserClub(club.id);
    } catch (e) {
      console.error(e);
    }
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
    <main className="ClubContainer col-md-9 col-lg-10">
      <img src={club.bannerImgUrl} className="ClubContainer-banner" alt="Club banner"/>
      <h1 className="mt-4">
        {club.name}
      </h1>
      <aside className="mb-2">Founded {foundedDate.toLocaleDateString()}</aside>
      {!isMember &&
        <button onClick={joinClub} className="btn btn-success mb-3">Join Club</button>
      }
      <ClubNav club={club} isMember={isMember} isFounder={isFounder}/>
      <ContentComponent club={club} isMember={isMember} editClub={editClub} deleteClub={deleteClub}/>
    </main>
  )
}

export default ClubContainer;