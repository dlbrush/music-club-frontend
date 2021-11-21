import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import API from '../../api';
import MakePost from '../../posts/MakePost';
import { testPost1, testSearchAlbum1 } from '../helpers/testHelpers';

jest.mock('../../api');


describe('MakePost', () => {
  const renderMakePost = () => {
    return render(
      <MemoryRouter initialEntries={['/clubs/1/new-post']} >
        <Route path="/clubs/:clubId/new-post">
          <MakePost albumChoice={testSearchAlbum1} />
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
    renderMakePost();
  });

  it('Renders consistently', async () => {
    const { asFragment } = renderMakePost();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Populates album data from chosen album', async () => {
    const { getByText } = renderMakePost();
    getByText(testSearchAlbum1.title);
    getByText(testSearchAlbum1.year);
  });
});