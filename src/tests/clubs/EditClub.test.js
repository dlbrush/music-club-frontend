import { render } from '@testing-library/react';
import { testClub1, testUserContext } from '../helpers/testHelpers';
import UserContext from '../../contexts/userContext';
import EditClub from '../../clubs/EditClub';

describe('EditClub', () => {
  const mockDeleteClub = jest.fn(() => true);
  const mockEditClub = jest.fn(() => true);

  const renderEditClub = () => {
    return render(
    <UserContext.Provider value={testUserContext}>
      <EditClub club={testClub1} deleteClub={mockDeleteClub} editClub={mockEditClub} />
    </UserContext.Provider>
    )
  }
  it('Renders successfully', () => {
    renderEditClub();
  });

  it('Maintains basic rendering', () => {
    const { asFragment } = renderEditClub();
    expect(asFragment()).toMatchSnapshot();
  });
});