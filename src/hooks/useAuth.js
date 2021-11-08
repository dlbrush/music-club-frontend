import { useEffect, useState } from "react";

import API from "../api";

const useAuth = () => {
  const [ username, setUsername ] = useState(null);
  const [ authenticating, setAuthenticating ] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { username } = await API.checkAuth();
        setUsername(username);
      } catch (e) {
        console.warn(e);
      };
      setAuthenticating(false);
    }
    checkAuth();
  }, []);

  const login = async (creds) => {
    try {
      const { username } = await API.login(creds);
      setUsername(username);
    } catch(e) {
      throw e;
    }
  }

  const register = async (data) => {
    try {
      const { username } = await API.register(data);
      setUsername(username);
    } catch(e) {
      throw e
    }
  }

  const logout = async () => {
    try {
      await API.logout();
      setUsername(null);
    } catch(e) {
      throw e
    }
  }

  return {
    authenticating,
    username,
    login,
    register,
    logout
  }
}

export default useAuth;