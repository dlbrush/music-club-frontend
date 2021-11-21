import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import API from '../../api';
import userContext from '../../contexts/userContext';
import RecentPosts from '../../posts/RecentPosts';
import { testPost1, testPost2, testUserContext } from '../helpers/testHelpers';

jest.mock('../../api');

describe('RecentPosts', () => {
  const renderRecentPosts= () => {
    return render(
      <MemoryRouter>
        <userContext.Provider value={testUserContext}>
          <RecentPosts/>
        </userContext.Provider>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    API.getRecentPosts.mockResolvedValue([testPost1, testPost2]);
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderRecentPosts();
  });

  it('Renders consistently after loading', async () => {
    const { asFragment, findByText } = renderRecentPosts();
    await findByText(testPost1.album.artist);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders loading message on render', () => {
    const { getByText } = renderRecentPosts();
    getByText('Loading posts...');
  });

  it('Renders message if no posts found', async () => {
    API.getRecentPosts.mockResolvedValue([]);
    const { findByText } = renderRecentPosts();
    await findByText('No recent posts! Join clubs to see posts.');
  })
});