import { useEffect, useState } from "react";
import API from "../api";

const useUser = (username, authenticating) => {
  const [ user, setUser ] = useState(null);
  const [ loadingUser, setLoadingUser ] = useState(true);

  useEffect(() => {
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
        setUser(user);
      } catch(e) { 
        console.error(e);
      }
      setLoadingUser(false);
    }
    getUser();
  }, [authenticating, username]);

  const editUser = (email, profileImgUrl) => {
    setUser(user => {
      user.email = email;
      user.profileImgUrl = profileImgUrl;
      return {...user};
    })
  }

  const addClub = (club) => {
    setUser(user => {
      user.clubs.push(club);
      return {...user};
    })
  }

  const editUserClub = (club) => {
    setUser(user => {
      const clubToEditIndex = user.clubs.findIndex(userClub => userClub.id === club.id);
      user.clubs[clubToEditIndex] = club;
      return {...user};
    });
  }

  const deleteUserClub = (clubId) => {
    setUser(user => {
      user.clubs = user.clubs.filter(userClub => userClub.id !== clubId);
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
    editUser,
    addClub,
    editUserClub,
    deleteUserClub,
    removeInvitation
  }
}

export default useUser;