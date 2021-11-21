import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import API from '../../api';
import userContext from '../../contexts/userContext';
import ClubPostContainer from '../../posts/ClubPostContainer';
import { testPost1, testUserContext, testUser } from '../helpers/testHelpers';

jest.mock('../../api');


describe('ClubPostContainer', () => {
  const renderClubPostContainer = () => {
    return render(
      <MemoryRouter initialEntries={['/posts/1']} >
        <Route path="/posts/:postId">
          <userContext.Provider value={testUserContext}>
            <ClubPostContainer isMember={true} />
          </userContext.Provider>
        </Route>
      </MemoryRouter>
    )
  }

  beforeEach(() => {
    API.getPost.mockResolvedValue(testPost1);
    API.newComment.mockResolvedValue({
      username: 'test1',
      comment: 'new comment',
      postId: 1,
      id: 3,
      user: testUser,
      postedAt: Date()
    });
    API.editComment.mockResolvedValue({
      username: 'test1',
      comment: 'different comment',
      postId: 1,
      id: 1,
      user: testUser,
      postedAt: Date()
    });
    API.deleteClub.mockResolvedValue(true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Renders successfully', () => {
    renderClubPostContainer();
  });

  it('Renders consistently (after loading)', async () => {
    const { asFragment, findByText } = renderClubPostContainer();
    await findByText('Album');
    expect(asFragment()).toMatchSnapshot();
  });

  it('Returns loading message initially', () => {
    const { getByText } = renderClubPostContainer();
    getByText('Loading post...');
  });

  it('Allows user to delete their own comment', async () => {
    const { findByText } = renderClubPostContainer();
    const deleteButton = await findByText('Delete Comment');
    fireEvent.click(deleteButton);
    expect(await findByText('comment')).not.toBeInTheDocument();
  });

  it('Allows user to edit their own comment', async () => {
    const { findByText, getByLabelText, getByText } = renderClubPostContainer();
    const editButton = await findByText('Edit Comment');
    fireEvent.click(editButton);
    const editCommentField = getByLabelText('Edit Comment:');
    fireEvent.change(editCommentField, {target: {value: 'different comment'}});
    fireEvent.click(getByText('Update'));
    expect(await findByText('comment')).not.toBeInTheDocument();
  });
  
  it('Allows member to add comment', async () => {
    const { findByLabelText, findByText, getByText } = renderClubPostContainer();
    const commentInput = await findByLabelText('Add Comment:');
    fireEvent.change(commentInput, {target: {value: 'new comment'}});
    fireEvent.click(getByText('Comment'));
    await findByText('new comment');
  });

  it('Does not show comments if user is not member', async () => {
    const { findByText, queryByText } = render(
      <MemoryRouter initialEntries={['/posts/1']} >
        <Route path="/posts/:postId">
          <userContext.Provider value={testUserContext}>
            <ClubPostContainer isMember={false} />
          </userContext.Provider>
        </Route>
      </MemoryRouter>
    )
    // Wait for album to appear before asserting comment
    await findByText('Album');
    expect(queryByText('comment')).not.toBeInTheDocument();
  });
});