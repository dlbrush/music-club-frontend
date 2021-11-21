import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import PostCard from '../../posts/PostCard';
import { testPost1 } from '../helpers/testHelpers';


describe('PostCard', () => {
  const renderPostCard = () => {
    return render(
      <MemoryRouter>
        <PostCard post={testPost1} showClub={false} />
      </MemoryRouter>
    )
  }

  it('Renders successfully', () => {
    renderPostCard();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderPostCard();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Only shows content and recTracks if they are present in post object', () => {
    testPost1.content = '';
    testPost1.recTracks = '';
    const { queryByText } = renderPostCard();
    expect(queryByText('Recommended Tracks:', {exact: false})).not.toBeInTheDocument();
    expect(queryByText('"', {exact: false})).not.toBeInTheDocument();
  });

  it('Shows name of club if showClub set to true', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostCard post={testPost1} showClub={true} />
      </MemoryRouter>
    )
    getByText('Posted in Club');
  });

  it('Directs user to post link when clicked', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PostCard post={testPost1} showClub={true} />
        <Route exact path="/clubs/1/posts/1">
          Redirected
        </Route>
      </MemoryRouter>
    )
    fireEvent.click(getByText(testPost1.album.artist));
    getByText('Redirected');
  });
});