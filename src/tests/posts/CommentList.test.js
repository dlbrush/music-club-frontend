import { render } from '@testing-library/react';
import userContext from '../../contexts/userContext';
import CommentList from '../../posts/CommentList';
import { testComment1, testUserContext, testComment2 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('CommentList', () => {
  let mockDeleteComment;
  let mockEditComment;

  const renderCommentList = () => {
    return render(
      <userContext.Provider value={testUserContext}>
        <CommentList comments={[testComment1, testComment2]} deleteComment={mockDeleteComment} editComment={mockEditComment} />
      </userContext.Provider>
    )
  }

  beforeEach(() => {
    mockDeleteComment = jest.fn(() => true);
    mockEditComment = jest.fn(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderCommentList();
  });

  it('Renders consistently in comment mode', () => {
    const { asFragment } = renderCommentList();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows all passed comments', () => {
    const { getByText } = renderCommentList();
    getByText('comment');
    getByText('comment again');
  });
});
