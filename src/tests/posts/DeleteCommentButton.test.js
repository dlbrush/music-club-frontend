import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import DeleteCommentButton from '../../posts/DeleteCommentButton';

jest.mock('../../api');

describe('DeleteCommentButton', () => {
  let mockDeleteComment;

  beforeEach(() => {
    mockDeleteComment = jest.fn(() => true);
    API.deleteComment.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<DeleteCommentButton commentId={1} deleteComment={mockDeleteComment} />);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<DeleteCommentButton commentId={1} deleteComment={mockDeleteComment} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to delete comment on click', async () => {
    const { getByText } = render(<DeleteCommentButton commentId={1} deleteComment={mockDeleteComment} />);
    const deleteButton = getByText('Delete Comment');
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(API.deleteComment).toHaveBeenCalledWith(1);
      expect(mockDeleteComment).toHaveBeenCalledWith(1);
    })
  });
});
