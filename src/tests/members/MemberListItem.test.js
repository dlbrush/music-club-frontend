import MemberListItem from "../../members/MemberListItem";
import { testUser } from '../helpers/testHelpers';
import { render } from '@testing-library/react';

describe('MemberListItem', () => {
  it('Renders successfully', () => {
    render(<MemberListItem member={testUser} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<MemberListItem member={testUser} />);
    expect(asFragment()).toMatchSnapshot();
  });
});