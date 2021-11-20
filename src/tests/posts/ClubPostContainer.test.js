import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import API from '../../api';
import userContext from '../../contexts/userContext';
import ClubPostContainer from '../../posts/ClubPostContainer';
import { testPost1, testComment1, testComment2, testUserContext } from '../helpers/testHelpers';

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
    API.newComment.mockResolvedValue(testComment1);
    API.editComment.mockResolvedValue(testComment1);
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

  // TODO
  // it('Allows member to add comment', async () => {
  //   const { findByLabelText, findByText } = renderClubPostContainer();
  //   const commentInput = await findByLabelText('Add Comment:');
  //   fireEvent.change(commentInput, {target: {value: 'new comment'}});
  // })
});