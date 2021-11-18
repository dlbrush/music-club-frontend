import { render } from '@testing-library/react';
import UserContext from '../contexts/userContext';
import { MemoryRouter } from "react-router";
import { testUserContext } from './helpers/testHelpers';
import Body from '../Body';

describe('Body', () => {
  describe('Shows unauth routes when no user', () => {
    const renderUnauthContext = () => {
      return render(
        <UserContext.Provider value={{user: null}}>
          <MemoryRouter initialEntries={['/']}>
            <Body/>
          </MemoryRouter>
        </UserContext.Provider>
      );
    };

    it('Renders successfully', () => {
      renderUnauthContext();
    });

    it('Maintains rendering', () => {
      const { asFragment } = renderUnauthContext();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows welcome screen on root route', () => {
      const { getByText } = renderUnauthContext();
      expect(getByText('Welcome!')).toBeInTheDocument();
    });
  });

  describe('Shows auth routes when user defined', () => {
    const renderAuthContext = () => {
      // Rendering new club route here because it's the least dependent on extra data
      return render(
        <UserContext.Provider value={testUserContext}>
          <MemoryRouter initialEntries={['/new-club']}>
            <Body/>
          </MemoryRouter>
        </UserContext.Provider>
      );
    };

    it('Renders successfully', () => {
      renderAuthContext();
    });

    it('Maintains rendering', () => {
      const { asFragment } = renderAuthContext();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows new club form for auth routes', () => {
      const { getByText } = renderAuthContext();
      expect(getByText('Create Club')).toBeInTheDocument();
    });
  });
});