import { render, fireEvent } from '@testing-library/react';
import AuthContext from '../../contexts/authContext';
import { MemoryRouter } from "react-router";
import { testAuthContext } from '../helpers/testHelpers';
import LogoutModal from '../../auth/LogoutModal';

describe('LogoutModal', () => {
  const renderLogoutModal = () => {
    return render(
      <AuthContext.Provider value={testAuthContext}>
        <MemoryRouter>
          <LogoutModal/>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }
  it('Renders successfully', () => {
    renderLogoutModal();
  });

  it('Maintains rendering', () => {
    const { asFragment } = renderLogoutModal();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Calls logout when button is clicked', () => {
    const { getByTestId } = renderLogoutModal();
    const logoutButton = getByTestId('Logout-modal-button');
    fireEvent.click(logoutButton);
    expect(testAuthContext.logout).toHaveBeenCalled();
  });
});