import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { testUserContext } from '../helpers/testHelpers';
import UserContext from '../../contexts/userContext';
import DeleteClubModal from '../../clubs/DeleteClubModal';

describe('DeleteClubModal', () => {
  const mockDeleteClub = jest.fn(() => true);
  const renderDeleteClubModal = () => {
    return render(
      <MemoryRouter>
        <UserContext.Provider value={testUserContext}>
          <DeleteClubModal clubId={1} deleteClub={mockDeleteClub} />
        </UserContext.Provider>
      </MemoryRouter>
    )
  }
  it('Renders successfully', () => {
    renderDeleteClubModal();
  });

  it('Maintains basic rendering', () => {
    const { asFragment } = renderDeleteClubModal();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Calls delete when button is pressed', () => {
    const { getByTestId } = renderDeleteClubModal();
    fireEvent.click(getByTestId('deleteButton2'));
    expect(mockDeleteClub).toHaveBeenCalled();
  });
});