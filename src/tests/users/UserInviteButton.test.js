import UserInviteButton from "../../users/UserInviteButton";
import { fireEvent, render, waitFor } from '@testing-library/react';

describe('UserInviteButton', () => {
  let mockInviteUser;

  beforeEach(() => {
    mockInviteUser = jest.fn(() => true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('Renders successfully', () => {
    render(<UserInviteButton />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<UserInviteButton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Changes button text and doesn't allow invite if user is a club member", () => {
    const { getByText } = render(<UserInviteButton inviteUser={mockInviteUser} isMember={true} />);
    const inviteButton = getByText('Member');
    fireEvent.click(inviteButton);
    expect(mockInviteUser).not.toHaveBeenCalled();
  });

  it("Changes button text and doesn't allow invite if user has already been invited", () => {
    const { getByText } = render(<UserInviteButton inviteUser={mockInviteUser} invited={true} />);
    const inviteButton = getByText('Invited');
    fireEvent.click(inviteButton);
    expect(mockInviteUser).not.toHaveBeenCalled();
  });

  it('Attempts to invite user if user is not invited or member', async () => {
    const { getByText } = render(<UserInviteButton inviteUser={mockInviteUser}/>);
    const inviteButton = getByText('Invite');
    fireEvent.click(inviteButton);
    await waitFor(() => {
      expect(mockInviteUser).toHaveBeenCalled();
    });
  });
});
