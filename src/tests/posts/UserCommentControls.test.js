import UserCommentControls from "../../posts/UserCommentControls";
import { render } from '@testing-library/react';
import { testComment1 } from "../helpers/testHelpers";

describe('UserCommentControls', () => {
  it('Renders successfully', () => {
    render(<UserCommentControls comment={testComment1} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<UserCommentControls comment={testComment1} />);
    expect(asFragment()).toMatchSnapshot();
  })
})