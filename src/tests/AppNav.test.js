import { render, fireEvent } from '@testing-library/react';
import UserContext from '../contexts/userContext';
import { MemoryRouter } from "react-router";
import { testUser } from './testHelpers';
import AppNav from '../AppNav';

describe('AppNav', () => {
  describe('Shows unauth links when no user', () => {
    const renderUnauthContext = () => {
      return render(
        <UserContext.Provider value={{user: null}}>
          <MemoryRouter>
            <AppNav/>
          </MemoryRouter>
        </UserContext.Provider>
      );
    }
    it('Renders successfully', () => {
      renderUnauthContext();
    });

    it('Maintains rendering', () => {
      const { asFragment } = renderUnauthContext();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows unauth links and not auth links', () => {
      const { queryByText } = renderUnauthContext();
      expect(queryByText('Register')).toBeInTheDocument();
      expect(queryByText('Recent')).not.toBeInTheDocument();
    });

    it('Shows link as active when clicked', () => {
      const { queryByText } = renderUnauthContext();
      const registerLink = queryByText('Register');
      expect(registerLink).not.toHaveClass('active');
      fireEvent.click(registerLink);
      expect(registerLink).toHaveClass('active');
    });
  });

  describe('Shows auth links when user is provided', () => {
    const renderAuthContext = () => {
      return render(
        <UserContext.Provider value={{user: testUser}}>
          <MemoryRouter>
            <AppNav/>
          </MemoryRouter>
        </UserContext.Provider>
      );
    }
    it('Renders successfully', () => {
      renderAuthContext();
    });

    it('Maintains rendering', () => {
      const { asFragment } = renderAuthContext();
      expect(asFragment()).toMatchSnapshot();
    });

    it('Shows auth links and not unauth links', () => {
      const { queryByText } = renderAuthContext();
      expect(queryByText('Register')).not.toBeInTheDocument();
      expect(queryByText('Recent')).toBeInTheDocument();
    });

    it('Shows red badge when user has invitation', () => {
      const { queryByText } = renderAuthContext();
      expect(queryByText('1')).toHaveClass('bg-danger')
    });

    it('Shows grey badge when user has no invitations', () => {
      testUser.invitations = [];
      const { queryByText } = renderAuthContext();
      expect(queryByText('0')).toHaveClass('bg-secondary')
    });
  });
});