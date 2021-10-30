import axios from 'axios';

const API_URI = process.env.API_URI || 'http://localhost:3000';

class API {
  static async checkAuth () {
    try {
      const response = await axios.post(`${API_URI}/auth/check`, {}, {withCredentials: true});
      return response.data.user;
    } catch (e) {
      const  { message, status } = e.response.data.error;
      throw new APIError(status, message);
    }
  }

  static async login(creds) {
    try {
      const response = await axios.post(`${API_URI}/auth/login`, creds, { withCredentials: true });
      return response.data.user
    } catch (e) {
      const  { message, status } = e.response.data.error;
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