import InvitationCard from '../../invitations/InvitationCard';
import {testInvitations, testUserContext} from '../helpers/testHelpers';
import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import UserContext from '../../contexts/userContext';

jest.mock('../../api');

describe('InvitationCard', () => {
  const renderInvitationCard = () => {
    return render(
      <UserContext.Provider value={testUserContext}>
        <InvitationCard invitation={testInvitations[0]} />
      </UserContext.Provider>
    )
  }

  beforeEach(() => {
    API.joinClub.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderInvitationCard();
  });

  it('Maintains rendering', () => {
    const { asFragment } = renderInvitationCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to add user to club when button is pressed', async () => {
    const { getByText } = renderInvitationCard();
    fireEvent.click(getByText('Join Club'));
    await waitFor(() => {
      expect(API.joinClub).toHaveBeenCalledWith(testInvitations[0].username, testInvitations[0].clubId);
      expect(testUserContext.addClub).toHaveBeenCalledWith(testInvitations[0].club);
      expect(testUserContext.removeInvitation).toHaveBeenCalledWith(testInvitations[0].clubId);
    })
  })
});