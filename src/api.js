import axios from 'axios';

const API_URI = process.env.API_URI || 'http://localhost:3000';

class API {
  static async handleRequest (requestFunction) {
    try {
      requestFunction();
    } catch (e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async checkAuth () {
    try {
      const response = await axios.post(`${API_URI}/auth/check`, {}, {withCredentials: true});
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
      const response = await axios.post(`${API_URI}/auth/logout`, { withCredentials: true });
      return response.data.message
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

  static async joinClub(username, clubId) {
    try {
      const response = await axios.post(`${API_URI}/users/${username}/join-club/${clubId}`, { withCredentials: true});
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

  static async deletePost(postId) {
    try {
      const response = await axios.delete(`${API_URI}/posts/${postId}`, { withCredentials: true});
      return response.data.message;
    } catch(e) {
      const { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }
}

class APIError extends Error {
  constructor(status, message) {
    super(`${status}: ${message}`);
    console.warn(this, message);
    this.status = status;
    this.message = message;
  }
}

export default API