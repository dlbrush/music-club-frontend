import { render } from '@testing-library/react';
import AuthContext from '../../contexts/authContext';
import { MemoryRouter } from "react-router";
import { testAuthContext } from '../helpers/testHelpers';
import Register from '../../auth/Register';

describe('Register', () => {
  const renderRegister = () => {
    return render(
      <AuthContext.Provider value={testAuthContext}>
        <MemoryRouter>
          <Register/>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }
  it('Renders successfully', () => {
    renderRegister();
  });

  it('Maintains rendering', () => {
    const { asFragment } = renderRegister();
    expect(asFragment()).toMatchSnapshot();
  });
});
