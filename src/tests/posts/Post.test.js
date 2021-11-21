import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import API from '../../api';
import userContext from '../../contexts/userContext';
import Post from '../../posts/Post';
import { testPost1, testUserContext } from '../helpers/testHelpers';

jest.mock('../../api');


describe('Post', () => {
  const renderPost = () => {
    return render(
      <MemoryRouter>
        <userContext.Provider value={testUserContext} >
          <Post post={testPost1} />
        </userContext.Provider>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    API.getPost.mockResolvedValue(testPost1);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderPost();
  });

  it('Renders consistently', async () => {
    const { asFragment } = renderPost();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Shows user post controls when post belongs to user in context', () => {
    const { getByText } = renderPost();
    getByText('Edit Post');
    getByText('Delete Post');
  });

  it('Does not show user post controls when post does not belong to user in context', () => {
    testUserContext.user.username = 'test2';
    const { queryByText } = renderPost();
    expect(queryByText('Edit Post')).not.toBeInTheDocument();
    expect(queryByText('Delete Post')).not.toBeInTheDocument();
  });

  it('Does not show section headers when content or recTracks not included', () => {
    testPost1.content = '';
    testPost1.recTracks = '';
    const { queryByText } = renderPost();
    expect(queryByText('Post')).not.toBeInTheDocument();
    expect(queryByText('Recommended Tracks')).not.toBeInTheDocument();
  });

  it('Displays genres separated by commas', () => {
    const { getByText } = renderPost();
    getByText('Pop, Rock');
  });
});