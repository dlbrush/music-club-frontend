import { fireEvent, render, waitFor } from '@testing-library/react';
import UserContext from '../../contexts/userContext';
import { MemoryRouter, Route } from "react-router";
import { testUserContext, testClub1 } from '../helpers/testHelpers';
import ClubContainer from '../../clubs/ClubContainer';
import EditClub from '../../clubs/EditClub';
import API from '../../api';
import React from 'react';

jest.mock('../../api')

describe('ClubContainer', () => {
  const renderClubContainer = () => {
    // Rendering Edit Club since it allows us to call all functions defined in component
    return render(
      <UserContext.Provider value={testUserContext}>
        <MemoryRouter initialEntries={['/club']}>
          <ClubContainer clubId={1} ContentComponent={EditClub}/>
          <Route exact path='/'>Redirected</Route>
        </MemoryRouter>
      </UserContext.Provider>
    );
  }

  beforeEach(() => {
    API.getClub.mockResolvedValue(testClub1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', async () => {
    await waitFor(() => {
      renderClubContainer();
    });
  });

  it('Maintains default (loading) rendering', () => {
    // Mock useEffect to do nothing to load default state
    jest.spyOn(React, 'useEffect').mockImplementation(() => false);
    const { asFragment } = renderClubContainer();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders redirect only if error is thrown', async () => {
    // Mock console.warn to quiet error messages
    console.warn = jest.fn(() => true);
    API.getClub.mockImplementation(() => {
      throw new Error('Error')}
    );
    const { findByText } = renderClubContainer();
    await findByText('Redirected');
  });

  it('Renders club name after loading', async () => {
    const { findByText } = renderClubContainer();
    await findByText(testClub1.name);
  })

  it('Renders join club button for user who is not member, which calls join club', async () => {
    API.joinClub.mockResolvedValue(true);
    testUserContext.user.username = 'test3';
    const { findByText } = renderClubContainer();
    const joinButton = await findByText('Join Club');
    // Wait for sequence to resolve before asserting
    await waitFor(() => {
      fireEvent.click(joinButton);
    })
    expect(API.joinClub).toHaveBeenCalledWith('test3', 1);
  });

  it('Calls edit club when edit club form is submitted', async () => {
    API.editClub.mockResolvedValue(true);
    const { findByText, findByLabelText } = renderClubContainer();
    // Set URL to valid so we can submit
    const bannerField = await findByLabelText('Banner Image URL:')
    fireEvent.change(bannerField, {target: {value: 'https://test.jpg'}});
    const editButton = await findByText('Update Club');
    expect(editButton).toBeInTheDocument();
    // Wait for sequence to resolve before asserting
    await waitFor(() => {
      fireEvent.click(editButton);
    });
    expect(API.editClub).toHaveBeenCalled();
  });

  it('Calls delete club when delete club button is clicked', async () => {
    API.deleteClub.mockResolvedValue(true);
    const { findByTestId } = renderClubContainer();
    // Set URL to valid so we can submit
    const deleteButton1 = await findByTestId('deleteButton1');
    fireEvent.click(deleteButton1);
    const deleteButton2 = await findByTestId('deleteButton2');
    // Wait for sequence to resolve before asserting
    await waitFor(() => {
      fireEvent.click(deleteButton2);
    });
    expect(API.deleteClub).toHaveBeenCalled();
  });
});