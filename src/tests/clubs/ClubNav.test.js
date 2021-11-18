import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ClubNav from '../../clubs/ClubNav';
import { testClub1 } from '../helpers/testHelpers'; 

describe('ClubNav', () => {
  const renderClubNav = (isMember, isFounder) => {
    return render(
      <MemoryRouter>
        <ClubNav club={testClub1} isMember={isMember} isFounder={isFounder} />
      </MemoryRouter>
    )
  }
  it('Renders successfully', () => {
    renderClubNav(true, true);
  });

  it('Maintains basic rendering', () => {
    const { asFragment } = renderClubNav(true, true);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders only posts and members for non members', () => {
    const { queryByText } = renderClubNav(false, false);
    expect(queryByText('Posts')).toBeInTheDocument();
    expect(queryByText('New Post')).not.toBeInTheDocument();
  });

  it('Renders new post but not edit club for members', () => {
    const { queryByText } = renderClubNav(true, false);
    expect(queryByText('New Post')).toBeInTheDocument();
    expect(queryByText('Edit Club')).not.toBeInTheDocument();
  });

  it('Renders edit club for founder', () => {
    const { queryByText } = renderClubNav(true, true);
    expect(queryByText('Edit Club')).toBeInTheDocument();
  });
});