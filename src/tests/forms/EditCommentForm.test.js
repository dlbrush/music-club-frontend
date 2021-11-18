import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import EditCommentForm from '../../forms/EditCommentForm';
import { testComment1 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('EditCommentForm', () => {
  let mockEditComment;
  let mockSetEditMode;

  beforeEach(() => {
    mockEditComment = jest.fn(() => true);
    mockSetEditMode = jest.fn(() => true);
    API.editComment.mockResolvedValue(testComment1);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<EditCommentForm setEditMode={mockSetEditMode} comment={testComment1} editComment={mockEditComment}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<EditCommentForm setEditMode={mockSetEditMode} comment={testComment1} editComment={mockEditComment}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = render(<EditCommentForm setEditMode={mockSetEditMode} comment={testComment1} editComment={mockEditComment}/>);
    const commentInput = getByLabelText('Edit Comment:');
    fireEvent.change(commentInput, {target: {value: 'comment'}});
    await waitFor(() => {
      fireEvent.click(getByText('Update'));
      expect(API.editComment).toHaveBeenCalledWith(1, {comment: 'comment'});
    });
  });

  it('Shows validation error on submitting empty comment', async () => {
    const { getByText, getByLabelText, findByText } = render(<EditCommentForm setEditMode={mockSetEditMode} comment={testComment1} editComment={mockEditComment}/>);
    const commentInput = getByLabelText('Edit Comment:');
    fireEvent.change(commentInput, {target: {value: ''}});
    fireEvent.click(getByText('Update'));
    await findByText("Can't submit empty comment");
  });

  it('Shows error on failed submit', async () => {
    API.editComment.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = render(<EditCommentForm setEditMode={mockSetEditMode} comment={testComment1} editComment={mockEditComment}/>);
    fireEvent.click(getByText('Update'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});