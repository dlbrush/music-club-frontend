import UserSearchResults from "../../users/UserSearchResults";
import { render } from '@testing-library/react';
import { testClub2, testInvitations, testUser, testUser2 } from "../helpers/testHelpers";

describe('UserSearchResults', () => {
  it('Renders successfully', () => {
    render(<UserSearchResults users={[testUser, testUser2]} invite={true} club={testClub2} invitations={testInvitations} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<UserSearchResults users={[testUser, testUser2]} invite={true} club={testClub2} invitations={testInvitations} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows all passed users', () => {
    const { getByText } = render(<UserSearchResults users={[testUser, testUser2]} invite={true} club={testClub2} invitations={testInvitations} />);
    getByText(testUser.username);
    getByText(testUser2.username);
  });
});
