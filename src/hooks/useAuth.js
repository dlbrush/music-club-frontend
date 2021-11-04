import { useEffect, useState } from "react";

import API from "../api";

const useAuth = () => {
  const [ user, setUser ] = useState(null);
  const [ authenticating, setAuthenticating ] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.checkAuth();
        setUser(user);
      } catch (e) {
        console.warn(e);
      };
      setAuthenticating(false);
    }
    checkAuth();
  }, []);

  const login = async (creds) => {
    try {
      const user = await API.login(creds);
      setUser(user);
    } catch(e) {
      throw e;
    }
  }

  const register = async (data) => {
    try {
      const user = await API.register(data);
      setUser(user);
    } catch(e) {
      throw e
    }
  }

  const logout = async () => {
    try {
      const message = await API.logout();
      setUser(null);
    } catch(e) {
      throw e
    }
  }

  return {
    authenticating,
    user,
    login,
    register,
    logout
  }
}

export default useAuth;