import UserSearchResultItem from "../../users/UserSearchResultItem";
import { render } from '@testing-library/react';
import { testClub2, testInvitations, testUser, testUser2 } from "../helpers/testHelpers";

describe('UserInviteButton', () => {
  let mockInviteUser;

  beforeEach(() => {
    mockInviteUser = jest.fn(() => true);
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('Renders successfully', () => {
    render(<UserSearchResultItem user={testUser2} invite={true} club={testClub2} inviteUser={mockInviteUser} invitations={testInvitations} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<UserSearchResultItem user={testUser2} invite={true} club={testClub2} inviteUser={mockInviteUser} invitations={testInvitations} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows that user is a member if they are in club member array', () => {
    const { getByText } = render(<UserSearchResultItem user={testUser} invite={true} club={testClub2} inviteUser={mockInviteUser} invitations={testInvitations} />);
    getByText('Member');
  });

  it('Shows that user is already invited if they are in invitations', () => {
    const { getByText } = render(<UserSearchResultItem user={testUser2} invite={true} club={testClub2} inviteUser={mockInviteUser} invitations={[{username: testUser2.username}]} />);
    getByText('Invited');
  });

  it('Does not show invitation button if invite is false', () => {
    const { queryByText } = render(<UserSearchResultItem user={testUser2} invite={false} club={testClub2} inviteUser={mockInviteUser} invitations={testInvitations} />);
    expect(queryByText('Invite')).not.toBeInTheDocument();
    expect(queryByText('Member')).not.toBeInTheDocument();
    expect(queryByText('Invited')).not.toBeInTheDocument();
  });
});
