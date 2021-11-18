import { render } from '@testing-library/react';
import ClubMembers from '../../clubs/ClubMembers';
import { testClub1 } from '../helpers/testHelpers'; 

describe('ClubMembers', () => {
  it('Renders successfully', () => {
    render(<ClubMembers club={testClub1} />);
  });

  it('Maintains basic rendering', () => {
    const { asFragment } = render(<ClubMembers club={testClub1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});