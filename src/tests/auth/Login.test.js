import { render } from '@testing-library/react';
import AuthContext from '../../contexts/authContext';
import { MemoryRouter } from "react-router";
import { testAuthContext } from '../testHelpers';
import Login from '../../auth/Login';

describe('Login', () => {
  const renderLogin = () => {
    return render(
      <AuthContext.Provider value={testAuthContext}>
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }
  it('Renders successfully', () => {
    renderLogin();
  });

  it('Maintains rendering', () => {
    const { asFragment } = renderLogin();
    expect(asFragment()).toMatchSnapshot();
  });
});