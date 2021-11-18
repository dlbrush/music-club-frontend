import MyClubs from "../../clubs/MyClubs";
import { MemoryRouter } from 'react-router-dom'
import UserContext from '../../contexts/userContext';
import { testUserContext } from '../helpers/testHelpers';
import { render } from '@testing-library/react';

describe('MyClubs', () => {
  describe('No clubs', () => {

    it('Renders successfully', () => {
      render(
        <MemoryRouter>
          <UserContext.Provider value={{user: {clubs: []}}}>
            <MyClubs />
          </UserContext.Provider>
        </MemoryRouter>
      )
    });

    it('Renders no clubs message', () => {
      const { getByText } = render(
        <MemoryRouter>
          <UserContext.Provider value={{user: {clubs: []}}}>
            <MyClubs />
          </UserContext.Provider>
        </MemoryRouter>
      );
      const msg = getByText("Looks like you haven't joined any clubs yet!", {exact: false});
      expect(msg).toBeInTheDocument();
    });
  });

  describe('User has clubs', () => {
    it('Renders successfully', () => {
      render(
        <MemoryRouter>
          <UserContext.Provider value={testUserContext}>
            <MyClubs />
          </UserContext.Provider>
        </MemoryRouter>
      )
    });

    it('Renders clubs', () => {
      const { getByText } = render(
        <MemoryRouter>
          <UserContext.Provider value={testUserContext}>
            <MyClubs />
          </UserContext.Provider>
        </MemoryRouter>
      );
      const clubName1 = getByText(testUserContext.user.clubs[0].name)
      const clubName2 = getByText(testUserContext.user.clubs[1].name);
      expect(clubName1).toBeInTheDocument();
      expect(clubName2).toBeInTheDocument();
    });
  });
});