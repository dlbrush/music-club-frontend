import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react';
import API from '../../api';
import PublicClubsView from '../../clubs/PublicClubsView';
import { testClub1, testClub2 } from '../helpers/testHelpers';
import React from 'react';

jest.mock('../../api');

describe('PublicClubsView', () => {

  beforeEach(() => {
    API.getPublicClubs.mockResolvedValue([testClub1, testClub2]);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    // Disable useeffect to render loading
    jest.spyOn(React, 'useEffect').mockImplementation(() => true);
    render(
      <MemoryRouter>
        <PublicClubsView />
      </MemoryRouter>
    );
  });

  it('Renders loading view consistently', () => {
    // Disable useeffect to render loading
    jest.spyOn(React, 'useEffect').mockImplementation(() => true);
    const { asFragment } = render(
      <MemoryRouter>
        <PublicClubsView />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows club list on load', async () => {
    const { findByText } = render(
      <MemoryRouter>
        <PublicClubsView />
      </MemoryRouter>
    );
    const msg = await findByText('Click any club to preview it.');
    const name1 = await findByText(testClub1.name);
    const name2 = await findByText(testClub2.name);
    expect(msg).toBeInTheDocument();
    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
  });
});