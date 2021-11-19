import MyInvitations from '../../invitations/MyInvitations';
import userContext from '../../contexts/userContext';
import { testUserContext } from '../helpers/testHelpers';
import { render } from '@testing-library/react';


describe('MyInvitations', () => {

  const renderMyInvitations = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <MyInvitations />
      </userContext.Provider>
    )
  }

  it('Renders successfully', () => {
    renderMyInvitations();
  });

  it('Renders consistently with invitations', () => {
    const { asFragment } = renderMyInvitations();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders consistently with no invitations', () => {
    testUserContext.invitations = [];
    const { asFragment } = render(
      <userContext.Provider value={testUserContext}>
        <MyInvitations />
      </userContext.Provider>
    )
    expect(asFragment()).toMatchSnapshot();
  });
});