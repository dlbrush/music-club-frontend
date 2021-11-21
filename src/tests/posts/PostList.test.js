import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PostList from '../../posts/PostList';
import { testPost1, testPost2 } from '../helpers/testHelpers';


describe('PostList', () => {
  const renderPostList= () => {
    return render(
      <MemoryRouter>
        <PostList posts={[testPost1, testPost2]} showClub={false} />
      </MemoryRouter>
    )
  }

  it('Renders successfully', () => {
    renderPostList();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderPostList();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders all posts in array', () => {
    const { getByText } = renderPostList();
    getByText(testPost1.album.artist);
    getByText(testPost2.album.artist);
  });

  it('Shows club names if showClub is true', () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <PostList posts={[testPost1, testPost2]} showClub={true} />
      </MemoryRouter>
    )
    // Club name is the same for both test posts
    getAllByText(`Posted in ${testPost1.clubName}`);
  });
});