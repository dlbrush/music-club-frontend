import axios from 'axios';

export const API_URI = process.env.API_URI || 'http://localhost:3000';

class API {
  static async checkAuth () {
    try {
      const response = await axios.post(`${API_URI}/auth/check`, {}, { withCredentials: true });
      return response.data.user;
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async login(creds) {
    try {
      const response = await axios.post(`${API_URI}/auth/login`, creds, { withCredentials: true });
      return response.data.user
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async register(data) {
    try {
      const response = await axios.post(`${API_URI}/auth/register`, data, { withCredentials: true });
      return response.data.user
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async logout() {
    try {
      const response = await axios.post(`${API_URI}/auth/logout`, {}, { withCredentials: true });
      return response.data.message
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async editUser(username, data) {
    try {
      const response = await axios.patch(`${API_URI}/users/${username}`, data, { withCredentials: true });
      return response.data.user
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getPublicClubs() {
    try {
      const response = await axios.get(`${API_URI}/clubs?isPublic=true`, { withCredentials: true });
      return response.data.clubs;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getClub(id) {
    try {
      const response = await axios.get(`${API_URI}/clubs/${id}`, { withCredentials: true });
      return response.data.club;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getClubPosts(id) {
    try {
      const response = await axios.get(`${API_URI}/posts?clubId=${id}`, { withCredentials: true });
      return response.data.posts;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getClubInvitations(id) {
    try {
      const response = await axios.get(`${API_URI}/clubs/${id}/invitations`, { withCredentials: true });
      return response.data.invitations;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async newClub(data) {
    try {
      const response = await axios.post(`${API_URI}/clubs`, data, { withCredentials: true });
      return response.data.newClub;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async joinClub(username, clubId) {
    try {
      const response = await axios.post(`${API_URI}/users/${username}/join-club/${clubId}`, {}, { withCredentials: true});
      return response.data.message;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async editClub(clubId, data) {
    try {
      const response = await axios.patch(`${API_URI}/clubs/${clubId}`, data, { withCredentials: true});
      return response.data.club;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async deleteClub(clubId) {
    try {
      const response = await axios.delete(`${API_URI}/clubs/${clubId}`, { withCredentials: true});
      return response.data.message;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async albumSearch(title, artist) {
    try {
      const response = await axios.get(`${API_URI}/albums/search?title=${title}&artist=${artist}`, { withCredentials: true});
      return response.data.albums;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async newPost(clubId, data) {
    try {
      const response = await axios.post(`${API_URI}/clubs/${clubId}/new-post`, data, { withCredentials: true});
      return response.data.newPost;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async editPost(postId, data) {
    try {
      const response = await axios.patch(`${API_URI}/posts/${postId}`, data, { withCredentials: true});
      return response.data.post;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getPost(postId) {
    try {
      const response = await axios.get(`${API_URI}/posts/${postId}`, { withCredentials: true});
      return response.data.post;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getRecentPosts(username) {
    try {
      const response = await axios.get(`${API_URI}/posts/recent/${username}`, { withCredentials: true});
      return response.data.posts;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async deletePost(postId) {
    try {
      const response = await axios.delete(`${API_URI}/posts/${postId}`, { withCredentials: true});
      return response.data.message;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async getUser(username) {
    try {
      const response = await axios.get(`${API_URI}/users/${username}`, { withCredentials: true});
      return response.data.user;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async searchUsers(username) {
    try {
      const response = await axios.get(`${API_URI}/users?username=${username}`, { withCredentials: true});
      return response.data.users;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async sendInvite(username, clubId) {
    try {
      const response = await axios.post(`${API_URI}/invitations`, {username, clubId}, { withCredentials: true});
      return response.data.invitation;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async newComment(postId, data) {
    try {
      const response = await axios.post(`${API_URI}/posts/${postId}/new-comment`, data, { withCredentials: true});
      return response.data.newComment;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async deleteComment(commentId) {
    try {
      const response = await axios.delete(`${API_URI}/comments/${commentId}`, { withCredentials: true});
      return response.data.message;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async editComment(commentId, data) {
    try {
      const response = await axios.patch(`${API_URI}/comments/${commentId}`, data, { withCredentials: true});
      return response.data.comment;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }
}

export class APIError extends Error {
  constructor(status, message) {
    super(`${status}: ${message}`);
    console.warn(this, message);
    this.status = status;
    this.message = message;
  }
}

export default API