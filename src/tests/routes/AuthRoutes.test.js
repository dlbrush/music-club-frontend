import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import API from "../../api";
import userContext from "../../contexts/userContext";
import AuthRoutes from "../../routes/AuthRoutes";
import { testClub1, testPost1, testPost2, testUserContext, testUser, testInvitations } from "../helpers/testHelpers";

jest.mock('../../api');

// Note - these tests throw a lot of errors regarding state updates because we don't care so much about the components fully rendering before we assert.

describe('AuthRoutes', () => {
  // Define a function to render different routes
  const renderRoute = (route = '') => {
    return render(
      <userContext.Provider value={testUserContext}>
        <MemoryRouter initialEntries={[route]} >
          <AuthRoutes />
        </MemoryRouter>
      </userContext.Provider>
    )
  }

  beforeEach(() => {
    // Mocking all the loading API calls
    API.getRecentPosts.mockResolvedValue([testPost1, testPost2]);
    API.getClub.mockResolvedValue(testClub1);
    API.getClubPosts.mockResolvedValue([testPost1, testPost2]);
    API.getPost.mockResolvedValue(testPost1);
    API.getClubInvitations.mockResolvedValue(testInvitations);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Renders successfully', () => {
    renderRoute();
  });

  it('Renders consistently', () => {
    const { asFragment } = renderRoute();
    expect(asFragment()).toMatchSnapshot();
  });

  it('Redirects to RecentPosts when no matching route', async () => {
    const { findByText } = renderRoute('abc');
    await findByText('Recent posts from your clubs');
  });

  it('Routes to guide when path is /guide', () => {
    const { getByText } = renderRoute('/guide');
    getByText('How to use Music Club');
  });

  it('Routes to Recent Posts when path is /recent', async () => {
    const { findByText } = renderRoute('/recent');
    await findByText('Recent posts from your clubs');
  });

  it('Routes to user invitations when path is /users/:username/invitations', () => {
    const { getByText } = renderRoute('/users/test1/invitations');
    getByText('Invitations');
  });

  it('Redirects to club posts view when when route is /clubs/:clubId', async () => {
    const { findByText } = renderRoute('/clubs/1');
    await findByText('Posts');
  });

  it('Shows club posts when route is /clubs/:clubId/posts', async () => {
    const { findByText } = renderRoute('/clubs/1/posts');
    await findByText('Posts');
  });

  it('Shows club members when route is /clubs/:clubId/members', async () => {
    const { findByText } = renderRoute('/clubs/1/members');
    await findByText(testUser.username);
  });

  it('Shows new post form when route is /clubs/:clubId/new-post', async () => {
    const { findByText } = renderRoute('/clubs/1/new-post');
    await findByText('Search for an album to recommend');
  });

  it('Shows post info when route is /clubs/:clubId/posts/:postId', async () => {
    const { findByText } = renderRoute('/clubs/1/posts/1');
    await findByText(`Recommendation by ${testPost1.postedBy}`);
  });

  it('Shows edit post form when route is /clubs/:clubId/posts/:postId/edit', async () => {
    const { findByText } = renderRoute('/clubs/1/posts/1/edit');
    await findByText('Edit your recommendation');
  });

  it('Shows club edit form when route is /clubs/:clubId/edit', async () => {
    const { findByText } = renderRoute('/clubs/1/edit');
    await findByText('Banner Image URL:');
  });

  it('Shows new club form when route is /new-club', async () => {
    const { findByText } = renderRoute('/new-club');
    await findByText('Start a Club');
  });
});