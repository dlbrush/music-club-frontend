import { fireEvent, render, waitFor } from '@testing-library/react';
import API from '../../api';
import * as ReactRouter from 'react-router';
import NewPostForm from '../../forms/NewPostForm';
import { testPost1 } from '../helpers/testHelpers';

jest.mock('../../api');

describe('NewPostForm', () => {
  const renderNewPostForm = () => {
    return render(
      <ReactRouter.MemoryRouter initialEntries={['/clubs/1/new-post']}>
        <ReactRouter.Route exact path="/clubs/:clubId/new-post">
          <NewPostForm discogsId={1}/>
        </ReactRouter.Route>
      </ReactRouter.MemoryRouter>
    )
  }
  beforeEach(() => {
    API.newPost.mockResolvedValue(testPost1);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderNewPostForm();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderNewPostForm();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Attempts to submit on button press', async () => {
    const { getByText } = renderNewPostForm();
    fireEvent.click(getByText('Post'));
    await waitFor(() => {
      expect(API.newPost).toHaveBeenCalledWith('1', {
        content: '',
        recTracks: '',
        discogsId: 1
      });
    });
  });

  it('Shows error on failed submit', async () => {
    API.newPost.mockImplementation(() => {throw new Error('Error')});
    const { getByText, findByText } = renderNewPostForm();
    fireEvent.click(getByText('Post'));
    await findByText('Error');
  });
});