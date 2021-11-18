import { fireEvent, render } from '@testing-library/react';
import InviteUsers from '../../clubs/InviteUsers';
import { testClub2, testInvitations, testUser, testUser2 } from '../helpers/testHelpers'; 
import API from '../../api';
import React from 'react';

jest.mock('../../api');

describe('InviteUsers', () => {
  const renderInviteUsers = () => {
    return render(
      <InviteUsers club={testClub2} />
    )
  }

  beforeEach(() => {
    API.getClubInvitations.mockResolvedValue(testInvitations)
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', () => {
    // Mock useEffect to disable loading here, invitations aren't important until we have users
    jest.spyOn(React, 'useEffect').mockImplementation(() => false);
    renderInviteUsers();
  });

  it('Maintains basic rendering', () => {
    // Mock useEffect to disable loading here, invitations aren't important until we have users
    jest.spyOn(React, 'useEffect').mockImplementation(() => false);
    const { asFragment } = renderInviteUsers();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows no users found if empty users array returned', async () => {
    API.searchUsers.mockResolvedValue([]);
    const { findByText } = renderInviteUsers();
    const searchButton = await findByText('Search');
    fireEvent.click(searchButton);
    const noUsers = await findByText('No users found.');
    expect(noUsers).toBeInTheDocument();
  });

  it('Shows users with membership status when users are shown', async () => {
    API.searchUsers.mockResolvedValue([testUser, testUser2]);
    const { findByText } = renderInviteUsers();
    const searchButton = await findByText('Search');
    fireEvent.click(searchButton);
    const username1 = await findByText(testUser.username);
    const username2 = await findByText(testUser2.username);
    expect(username1).toBeInTheDocument();
    expect(username2).toBeInTheDocument();
    const memberButton = await findByText('Member');
    const inviteButton = await findByText('Invite');
    expect(memberButton).toBeInTheDocument();
    expect(inviteButton).toBeInTheDocument();
  });

  it('Updates invite status when member is invited', async () => {
    API.searchUsers.mockResolvedValue([testUser, testUser2]);
    API.sendInvite.mockImplementation((username) => {
      return {username}
    });
    const { findByText } = renderInviteUsers();
    const searchButton = await findByText('Search');
    fireEvent.click(searchButton);
    const inviteButton = await findByText('Invite');
    fireEvent.click(inviteButton);
    const invitedButton = await findByText('Invited');
    expect(invitedButton).toBeInTheDocument();
  });
});