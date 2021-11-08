import { useEffect, useState } from "react";
import API from "../api";

const useUser = (username, authenticating) => {
  const [ user, setUser ] = useState(null);
  const [ loadingUser, setLoadingUser ] = useState(true);

  useEffect(() => {
    console.log('useUser thinks username:', username, 'authenticating:', authenticating);
    // Do nothing until the authentication process is finished
    if (!username || authenticating) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    const getUser = async () => {
      setLoadingUser(true);
      try {
        const user = await API.getUser(username);
        console.log(user);
        setUser(user);
      } catch(e) { 
        console.error(e);
      }
      setLoadingUser(false);
    }
    getUser();
  }, [authenticating, username]);

  const addClub = (club) => {
    setUser(user => {
      user.clubs.push(club);
      return {...user};
    })
  }

  const removeInvitation = (clubId) => {
    setUser(user => {
      user.invitations = user.invitations.filter(invitation => invitation.clubId !== clubId);
      return {...user};
    })
  }

  return {
    user,
    loadingUser,
    addClub,
    removeInvitation
  }
}

export default useUser;