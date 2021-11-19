import { fireEvent, render, waitFor } from '@testing-library/react';
import UserInviteSearchForm from '../../forms/UserInviteSearchForm';


describe('UserInviteSearchForm', () => {
  let mockSearchUsers;

  beforeEach(() => {
    mockSearchUsers = jest.fn(() => true);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<UserInviteSearchForm searchUsers={mockSearchUsers}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<UserInviteSearchForm searchUsers={mockSearchUsers}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = render(<UserInviteSearchForm searchUsers={mockSearchUsers}/>);
    const usernameInput = getByLabelText('Search username:');
    fireEvent.change(usernameInput, {target: {value: 'username'}});
    await waitFor(() => {
      fireEvent.click(getByText('Search'));
      expect(mockSearchUsers).toHaveBeenCalledWith('username');
    });
  });

  it('Shows error on failed submit', async () => {
    mockSearchUsers.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = render(<UserInviteSearchForm searchUsers={mockSearchUsers}/>);
    fireEvent.click(getByText('Search'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});