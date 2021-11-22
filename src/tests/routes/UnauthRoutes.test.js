import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import authContext from "../../contexts/authContext";
import UnauthRoutes from "../../routes/UnauthRoutes";
import { testAuthContext } from "../helpers/testHelpers";

jest.mock('../../api');

// Note - these tests throw a lot of errors regarding state updates because we don't care so much about the components fully rendering before we assert.

describe('UnauthRoutes', () => {
  // Define a function to render different routes
  const renderRoute = (route = '') => {
    return render(
      <authContext.Provider value={testAuthContext}>
        <MemoryRouter initialEntries={[route]} >
          <UnauthRoutes />
        </MemoryRouter>
      </authContext.Provider>
    )
  }

  it('Renders successfully', () => {
    renderRoute();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderRoute();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Redirects to Splash screen when no matching route', () => {
    const { getByText } = renderRoute('abc');
    getByText('Share. Discuss. Discover.');
  });

  it('Shows splash screen when the route is /', () => {
    const { getByText } = renderRoute('/');
    getByText('Share. Discuss. Discover.');
  });

  it('Shows guide when the route is /guide', () => {
    const { getByText } = renderRoute('/guide');
    getByText('How to use Music Club');
  });

  it('Shows login form when the route is /login', () => {
    const { getByText } = renderRoute('/login');
    getByText('Password');
  });

  it('Shows registration form when the route is /register', () => {
    const { getByText } = renderRoute('/register');
    getByText('Username (required)');
  });
});