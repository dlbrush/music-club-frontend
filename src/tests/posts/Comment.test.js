import { fireEvent, render } from '@testing-library/react';
import API from '../../api';
import userContext from '../../contexts/userContext';
import Comment from '../../posts/Comment';
import { testComment1, testUserContext, testUser2 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('Comment', () => {
  let mockDeleteComment;
  let mockEditComment;

  const renderComment = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <Comment comment={testComment1} deleteComment={mockDeleteComment} editComment={mockEditComment} />
      </userContext.Provider>
    )
  }

  beforeEach(() => {
    mockDeleteComment = jest.fn(() => true);
    mockEditComment = jest.fn(() => true);
    // Returned comment value here does not need to be full, just need to return something to get through edit comment function
    API.editComment.mockResolvedValue({comment: 'comment'})
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderComment();
  });

  it('Renders consistently in comment mode', () => {
    const { asFragment } = renderComment();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Toggles between edit mode when looking at user own comment', async () => {
    const { getByText, findByText } = renderComment();
    // Toggle to edit mode
    fireEvent.click(getByText('Edit Comment'));
    // Update comment to toggle back to default display
    const updateButton = getByText('Update');
    expect(updateButton).toBeInTheDocument();
    fireEvent.click(updateButton);
    await findByText('test1 commented:');
  });

  it("Doesn't show user controls for comment that is not by the user", async () => {
    testUserContext.user = testUser2;
    const { queryByText } = renderComment();
    expect(queryByText('Edit Comment')).not.toBeInTheDocument();
  });
});
