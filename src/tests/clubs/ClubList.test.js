import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import ClubList from '../../clubs/ClubList';
import { testClub1, testClub2 } from '../helpers/testHelpers'; 

describe('ClubList', () => {
  const testClubs = [testClub1, testClub2];

  it('Renders successfully', () => {
    render(
      <MemoryRouter>
        <ClubList clubs={testClubs} />
      </MemoryRouter>
    );
  });

  it('Maintains basic rendering', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ClubList clubs={testClubs} />
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Redirects to club route on list item click', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ClubList clubs={testClubs} />
        <Route exact path="/clubs/1">Visited</Route>
      </MemoryRouter>
    );
    fireEvent.click(getByText('Club'));
    expect(getByText('Visited')).toBeInTheDocument();
  });
});