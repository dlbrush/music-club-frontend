import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import API from '../../api';
import EditPost from '../../posts/EditPost';
import { testPost1 } from '../helpers/testHelpers';

jest.mock('../../api');


describe('EditPost', () => {
  const renderEditPost = () => {
    return render(
      <MemoryRouter initialEntries={['/posts/1']} >
        <Route path="/posts/:postId">
          <EditPost isMember={true} />
        </Route>
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
    renderEditPost();
  });

  it('Renders consistently (after loading)', async () => {
    const { asFragment, findByText } = renderEditPost();
    await findByText('Album');
    expect(asFragment()).toMatchSnapshot();
  });

  it('Returns loading message initially', () => {
    const { getByText } = renderEditPost();
    getByText('Loading post...');
  });

  it('Populates post text in form', async () => {
    const { findByLabelText } = renderEditPost();
    const contentInput = await findByLabelText('Say something about this album');
    const tracksInput = await findByLabelText('Recommended tracks');
    expect(contentInput).toHaveValue('content');
    expect(tracksInput).toHaveValue('recTracks');
  });

  it('Populates album data for post', async () => {
    const { findByText } = renderEditPost();
    await findByText(testPost1.album.title);
    await findByText(testPost1.album.year);
  });

  it('Redirects if error occurs in loading', async () => {
    API.getPost.mockImplementation(() => {throw new Error('Error')});
    const { findByText } = render(
      <MemoryRouter initialEntries={['/posts/1']} >
        <Route exact path="/posts/:postId">
          <EditPost isMember={true} />
        </Route>
        <Route exact path="/">
          Redirected
        </Route>
      </MemoryRouter>
    )
    await findByText('Redirected');
  });
});