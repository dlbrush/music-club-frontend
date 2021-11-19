import MemberList from "../../members/MemberList";
import { testUser, testUser2 } from '../helpers/testHelpers';
import { render } from '@testing-library/react';

describe('MemberList', () => {
  it('Renders successfully', () => {
    render(<MemberList members={[testUser, testUser2]} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<MemberList members={[testUser, testUser2]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});