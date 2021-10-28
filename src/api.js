import axios from 'axios';

const API_URI = process.env.API_URI || 'http://localhost:3000';

class API {
  static async checkAuth () {
    const response = await axios.post(`${API_URI}/auth/check`);
    console.log(response);
    if (response.status === 200) {
      return response.data.user;
    } else {
      throw new APIError(response.status, response.data);
    }
  }
}

class APIError extends Error {
  constructor(status, data) {
    super(`${status}`);
    console.error(this, data);
    this.status = status;
    this.data = data;
  }
}

export default API