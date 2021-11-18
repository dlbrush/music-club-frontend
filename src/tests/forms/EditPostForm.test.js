import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import EditPostForm from '../../forms/EditPostForm';
import { testPost1 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('EditPostForm', () => {
  beforeEach(() => {
    API.editPost.mockResolvedValue(testPost1);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    render(<EditPostForm post={testPost1}/>);
  });

  it('Renders consistently', () => {
    const { asFragment } = render(<EditPostForm post={testPost1}/>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText, getByLabelText } = render(<EditPostForm post={testPost1}/>);
    const contentField = getByLabelText('Say something about this album');
    fireEvent.change(contentField, {target: {value: 'new content'}});
    await waitFor(() => {
      fireEvent.click(getByText('Edit Post'));
      expect(API.editPost).toHaveBeenCalledWith(1, {
        content: 'new content',
        recTracks: testPost1.recTracks
      });
    });
  });

  it('Shows error on failed submit', async () => {
    API.editPost.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = render(<EditPostForm post={testPost1}/>);
    fireEvent.click(getByText('Edit Post'));
    const error = await findByText('Error');
    expect(error).toBeInTheDocument();
  });
});