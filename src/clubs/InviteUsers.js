import { useEffect, useState } from 'react';
import UserInviteSearchForm from '../forms/UserInviteSearchForm';
import UserSearchResults from '../users/UserSearchResults';

import API from '../api';

const InviteUsers = ({ club }) => {
  const [ loadingUsers, setLoadingUsers ] = useState(false);
  const [ userResults, setUserResults ] = useState(null);
  const [ clubInvitations, setClubInvitations ] = useState([]);

  useEffect(() => {
    const getClubInvitations = async () => {
      try {
        const clubInvitations = await API.getClubInvitations(club.id);
        setClubInvitations(clubInvitations);
      } catch(e) {
        console.warn(e);
      }
    }
    getClubInvitations();
  }, [club]);

  const searchUsers = async (username) => {
    setLoadingUsers(true);
    try {
      const users = await API.searchUsers(username);
      setUserResults(users);
    } catch (e) {
      setUserResults([]);
      throw (e);
    }
    setLoadingUsers(false);
  }

  const inviteUser = async (username) => {
    try {
      const invitation = await API.sendInvite(username, club.id);
      // Add new invitation to invitations in state
      setClubInvitations(invitations => [...invitations, invitation]);
    } catch(e) {
      throw e
    }
  }

  return (
    <div className="InviteUsers mt-3 mb-5">
      <h2>Invite Users</h2>
      <UserInviteSearchForm searchUsers={searchUsers}/>
      {loadingUsers &&
        <p>Searching for users...</p>
      }
      {(!loadingUsers && (userResults && !userResults.length)) && 
        <p>No users found.</p>
      }
      {(!loadingUsers && (userResults && userResults.length > 0)) &&
        <UserSearchResults users={userResults} invitations={clubInvitations} club={club} inviteUser={inviteUser} />
      }
    </div>
  );
}

export default InviteUsers;