import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import API from '../../api';
import NewPost from '../../posts/NewPost';
import { testSearchAlbum1, testSearchAlbum2 } from '../helpers/testHelpers';

jest.mock('../../api');


describe('NewPost', () => {
  const renderNewPost = () => {
    return render(
      <MemoryRouter initialEntries={['/clubs/1/new-post']} >
        <Route path="/clubs/:clubId/new-post">
          <NewPost />
        </Route>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    API.albumSearch.mockResolvedValue([testSearchAlbum1, testSearchAlbum2]);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderNewPost();
  });

  it('Renders consistently in default ChooseAlbum view', async () => {
    const { asFragment } = renderNewPost();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Switches to rendering MakePost when album has been chosen in form', async () => {
    const { getByText, findByText, getByLabelText } = renderNewPost();
    // Click search to return mocked search results
    fireEvent.click(getByText('Search'));
    // Click on album to select it
    fireEvent.click(await findByText('Album'));
    // Click next to move to MakePost view
    fireEvent.click(getByText('Next'));
    // Expect to see form and album data
    getByLabelText('Recommended tracks');
    getByText(testSearchAlbum1.year);
  });
});