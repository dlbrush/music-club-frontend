import API, { APIError, API_URI } from "../api";
import axios from "axios";

jest.mock('axios');

class MockAxiosError extends Error {
  constructor(message) {
    super(message);
    this.response = {
      data: {
        error: message
      }
    }
  }
}

describe('API class', () => {

  // Mock console warn to turn off API error warnings
  console.warn = jest.fn(() => true);

  describe('#checkAuth', () => {
    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.post.mockResolvedValue({data: {user: 'user'}});
      const user = await API.checkAuth();
      expect(user).toEqual('user')
    });

    
  });

  describe('#login', () => {
    let mockCreds = {username: 'test'};

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.post.mockResolvedValue({data: {user: 'user'}});
      const user = await API.login(mockCreds);
      expect(user).toEqual('user')
    });

    it('calls with creds', async () => {
      axios.post.mockResolvedValue({data: {user: 'user'}});
      const user = await API.login(mockCreds);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), mockCreds, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.login(mockCreds))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#register', () => {
    let mockCreds = {username: 'test'};

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.post.mockResolvedValue({data: {user: 'user'}});
      const user = await API.register(mockCreds);
      expect(user).toEqual('user')
    });

    it('calls with creds', async () => {
      axios.post.mockResolvedValue({data: {user: 'user'}});
      const user = await API.register(mockCreds);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), mockCreds, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.register(mockCreds))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#logout', () => {
    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns message value from valid response', async () => {
      axios.post.mockResolvedValue({data: {message: 'message'}});
      const user = await API.logout();
      expect(user).toEqual('message')
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.logout())
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#editUser', () => {
    let mockData = { username: 'test' };

    afterEach(() => {
      axios.patch.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.patch.mockResolvedValue({data: {user: 'user'}});
      const user = await API.editUser('test1', mockData);
      expect(user).toEqual('user')
    });

    it('calls with creds to username route', async () => {
      axios.patch.mockResolvedValue({data: {user: 'user'}});
      const user = await API.editUser('test1',mockData);
      expect(axios.patch).toHaveBeenCalledWith(`${API_URI}/users/test1`, mockData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.patch.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.editUser('test1',mockData))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getPublicClubs', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.get.mockResolvedValue({data: {clubs: 'clubs'}});
      const clubs = await API.getPublicClubs();
      expect(clubs).toEqual('clubs')
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getPublicClubs())
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getClub', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns club value from valid response', async () => {
      axios.get.mockResolvedValue({data: {club: 'club'}});
      const club = await API.getClub(1);
      expect(club).toEqual('club')
    });

    it('calls with creds to club ID route', async () => {
      axios.get.mockResolvedValue({data: {user: 'user'}});
      const club = await API.getClub(1);
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/clubs/1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getClub(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getClubPosts', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns club value from valid response', async () => {
      axios.get.mockResolvedValue({data: {posts: 'posts'}});
      const posts = await API.getClubPosts(1);
      expect(posts).toEqual('posts')
    });

    it('calls with creds to club ID route', async () => {
      axios.get.mockResolvedValue({data: {posts: 'posts'}});
      const club = await API.getClubPosts(1);
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/posts?clubId=1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getClubPosts(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getClubInvitations', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns club value from valid response', async () => {
      axios.get.mockResolvedValue({data: {invitations: 'invitations'}});
      const invitations = await API.getClubInvitations(1);
      expect(invitations).toEqual('invitations')
    });

    it('calls to club ID route', async () => {
      axios.get.mockResolvedValue({data: {invitations: 'invitations'}});
      const invitations = await API.getClubInvitations(1);
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/clubs/1/invitations`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getClubInvitations(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#newClub', () => {
    let mockClubData = {name: 'club'};

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns club value from valid response', async () => {
      axios.post.mockResolvedValue({data: {newClub: 'newClub'}});
      const newClub = await API.newClub(mockClubData);
      expect(newClub).toEqual('newClub')
    });

    it('calls with club data', async () => {
      axios.post.mockResolvedValue({data: {newClub: 'newClub'}});
      const newClub = await API.newClub(mockClubData);
      expect(axios.post).toHaveBeenCalledWith(expect.anything(), mockClubData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.newClub(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#joinClub', () => {
    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns message value from valid response', async () => {
      axios.post.mockResolvedValue({data: {message: 'message'}});
      const message = await API.joinClub('test1', 1);
      expect(message).toEqual('message')
    });

    it('calls with username and clubId passed', async () => {
      axios.post.mockResolvedValue({data: {message: 'message'}});
      const message = await API.joinClub('test1', 1);
      expect(axios.post).toHaveBeenCalledWith(`${API_URI}/users/test1/join-club/1`, expect.anything(), expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.joinClub('test1', 1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#editClub', () => {
    const mockClubData = { name: 'club' };

    afterEach(() => {
      axios.patch.mockReset();
    });

    it('Returns club value from valid response', async () => {
      axios.patch.mockResolvedValue({data: {club: 'club'}});
      const club = await API.editClub(1, mockClubData);
      expect(club).toEqual('club')
    });

    it('calls with clubId and passed data', async () => {
      axios.patch.mockResolvedValue({data: {club: 'club'}});
      const message = await API.editClub(1, mockClubData);
      expect(axios.patch).toHaveBeenCalledWith(`${API_URI}/clubs/1`, mockClubData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.patch.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.editClub(1, mockClubData))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#deleteClub', () => {
    afterEach(() => {
      axios.delete.mockReset();
    });

    it('Returns message value from valid response', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deleteClub(1);
      expect(message).toEqual('message')
    });

    it('calls with to URL with clubId passed', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deleteClub(1);
      expect(axios.delete).toHaveBeenCalledWith(`${API_URI}/clubs/1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.delete.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.deleteClub(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#albumSearch', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns albums value from valid response', async () => {
      axios.get.mockResolvedValue({data: {albums: 'albums'}});
      const albums = await API.albumSearch('title', 'artist');
      expect(albums).toEqual('albums')
    });

    it('calls with to URL with title and artist passed', async () => {
      axios.get.mockResolvedValue({data: {albums: 'albums'}});
      const albums = await API.albumSearch('title', 'artist');
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/albums/search?title=title&artist=artist`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.albumSearch('title', 'artist'))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#newPost', () => {
    const mockPostData = {content: 'content'};

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns new post value from valid response', async () => {
      axios.post.mockResolvedValue({data: {newPost: 'newPost'}});
      const newPost = await API.newPost(1, mockPostData);
      expect(newPost).toEqual('newPost')
    });

    it('calls with club ID and post data passed', async () => {
      axios.post.mockResolvedValue({data: {newPost: 'newPost'}});
      const newPost = await API.newPost(1, mockPostData);
      expect(axios.post).toHaveBeenCalledWith(`${API_URI}/clubs/1/new-post`, mockPostData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.newPost(1, mockPostData))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#editPost', () => {
    const mockPostData = {content: 'content'};

    afterEach(() => {
      axios.patch.mockReset();
    });

    it('Returns post value from valid response', async () => {
      axios.patch.mockResolvedValue({data: {post: 'post'}});
      const club = await API.editPost(1, mockPostData);
      expect(club).toEqual('post')
    });

    it('calls with post ID and passed data', async () => {
      axios.patch.mockResolvedValue({data: {post: 'post'}});
      const club = await API.editPost(1, mockPostData);
      expect(axios.patch).toHaveBeenCalledWith(`${API_URI}/posts/1`, mockPostData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.patch.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.editPost(1, mockPostData))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getPost', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns post value from valid response', async () => {
      axios.get.mockResolvedValue({data: {post: 'post'}});
      const post = await API.getPost(1);
      expect(post).toEqual('post')
    });

    it('calls to post ID route', async () => {
      axios.get.mockResolvedValue({data: {post: 'post'}});
      const post = await API.getPost(1);
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/posts/1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getPost(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getRecentPosts', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns post value from valid response', async () => {
      axios.get.mockResolvedValue({data: {posts: 'posts'}});
      const posts = await API.getRecentPosts('test1');
      expect(posts).toEqual('posts')
    });

    it('calls to route with username', async () => {
      axios.get.mockResolvedValue({data: {posts: 'posts'}});
      const posts = await API.getRecentPosts('test1');
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/posts/recent/test1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getRecentPosts('test1'))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#deletePost', () => {
    afterEach(() => {
      axios.delete.mockReset();
    });

    it('Returns message value from valid response', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deletePost(1);
      expect(message).toEqual('message')
    });

    it('calls with to URL with post ID passed', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deletePost(1);
      expect(axios.delete).toHaveBeenCalledWith(`${API_URI}/posts/1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.delete.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.deletePost(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#getUser', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns user value from valid response', async () => {
      axios.get.mockResolvedValue({data: {user: 'user'}});
      const user = await API.getUser('test1');
      expect(user).toEqual('user')
    });

    it('calls to username route', async () => {
      axios.get.mockResolvedValue({data: {user: 'user'}});
      const user = await API.getUser('test1');
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/users/test1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.getUser('test1'))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#searchUsers', () => {
    afterEach(() => {
      axios.get.mockReset();
    });

    it('Returns users value from valid response', async () => {
      axios.get.mockResolvedValue({data: {users: 'users'}});
      const users = await API.searchUsers('test1');
      expect(users).toEqual('users')
    });

    it('calls to route with username as query string', async () => {
      axios.get.mockResolvedValue({data: {users: 'users'}});
      const users = await API.searchUsers('test1');
      expect(axios.get).toHaveBeenCalledWith(`${API_URI}/users?username=test1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.get.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.searchUsers('test1'))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#sendInvite', () => {
    const mockInvite = {
      username: 'test1',
      clubId: 1
    }

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns new post value from valid response', async () => {
      axios.post.mockResolvedValue({data: {invitation: 'invitation'}});
      const invitation = await API.sendInvite('test1', 1);
      expect(invitation).toEqual('invitation')
    });

    it('calls with club ID and username passed as data', async () => {
      axios.post.mockResolvedValue({data: {invitation: 'invitation'}});
      
      const invitation = await API.sendInvite('test1', 1);
      expect(axios.post).toHaveBeenCalledWith(`${API_URI}/invitations`, mockInvite, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.sendInvite('test1', 1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#newComment', () => {
    const mockComment = { comment: 'comment' };

    afterEach(() => {
      axios.post.mockReset();
    });

    it('Returns new post value from valid response', async () => {
      axios.post.mockResolvedValue({data: {newComment: 'newComment'}});
      const newComment = await API.newComment(1, mockComment);
      expect(newComment).toEqual('newComment')
    });

    it('calls with post ID passed to URL and comment data', async () => {
      axios.post.mockResolvedValue({data: {newComment: 'newComment'}});
      const newComment = await API.newComment(1, mockComment);
      expect(axios.post).toHaveBeenCalledWith(`${API_URI}/posts/1/new-comment`, mockComment, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.post.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.newComment('test1', 1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#deleteComment', () => {
    afterEach(() => {
      axios.delete.mockReset();
    });

    it('Returns message value from valid response', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deleteComment(1);
      expect(message).toEqual('message')
    });

    it('calls with to URL with comment ID passed', async () => {
      axios.delete.mockResolvedValue({data: {message: 'message'}});
      const message = await API.deleteComment(1);
      expect(axios.delete).toHaveBeenCalledWith(`${API_URI}/comments/1`, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.delete.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.deleteComment(1))
      .rejects
      .toThrow(APIError);
    });
  });

  describe('#editComment', () => {
    const mockCommentData = {comment: 'comment'};

    afterEach(() => {
      axios.patch.mockReset();
    });

    it('Returns post value from valid response', async () => {
      axios.patch.mockResolvedValue({data: {comment: 'comment'}});
      const comment = await API.editComment(1, mockCommentData);
      expect(comment).toEqual('comment')
    });

    it('calls with comment ID and passed data', async () => {
      axios.patch.mockResolvedValue({data: {post: 'post'}});
      const comment = await API.editComment(1, mockCommentData);
      expect(axios.patch).toHaveBeenCalledWith(`${API_URI}/comments/1`, mockCommentData, expect.anything())
    });

    it('Throws APIError if error occurs', async () => {
      axios.patch.mockImplementation(() => {
        throw new MockAxiosError('Error');
      });
      await expect(API.editComment(1, mockCommentData))
      .rejects
      .toThrow(APIError);
    });
  });
});