import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import CommentForm from '../../forms/CommentForm';

jest.mock('../../api');

describe('CommentForm', () => {
  let mockAddComment;

  beforeEach(() => {
    mockAddComment = jest.fn(() => true);
    API.newComment.mockResolvedValue('newComment');
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<CommentForm addComment={mockAddComment}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<CommentForm addComment={mockAddComment}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = render(<CommentForm postId={1} addComment={mockAddComment}/>);
    const commentInput = getByLabelText('Add Comment:');
    fireEvent.change(commentInput, {target: {value: 'comment'}});
    await waitFor(() => {
      fireEvent.click(getByText('Comment'));
      expect(API.newComment).toHaveBeenCalledWith(1, {comment: 'comment'});
      expect(mockAddComment).toHaveBeenCalledWith('newComment');
    });
  });

  it('Shows error on failed submit', async () => {
    API.newComment.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = render(<CommentForm addComment={mockAddComment}/>);
    fireEvent.click(getByText('Comment'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});