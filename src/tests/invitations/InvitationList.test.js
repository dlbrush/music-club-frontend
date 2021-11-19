import InvitationList from '../../invitations/InvitationList';
import userContext from '../../contexts/userContext';
import { testUserContext, testInvitations } from '../helpers/testHelpers';
import { render } from '@testing-library/react';


describe('InvitationList', () => {

  const renderInvitationList = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <InvitationList invitations={testInvitations} />
      </userContext.Provider>
    )
  }

  it('Renders successfully', () => {
    renderInvitationList();
  });

  it('Renders consistently with invitations', () => {
    const { asFragment } = renderInvitationList();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders consistently with no invitations', () => {
    const { asFragment } = render(
      <userContext.Provider value={testUserContext}>
        <InvitationList invitations={[]} />
      </userContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot();
  });
});