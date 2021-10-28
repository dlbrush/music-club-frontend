import Header from './Header';
import Body from './Body';
import API from './api';
import AuthContext from './contexts/authContext';

import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

function App() {

  const [ user, setUser ] = useState(undefined);
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(true);

  const login = async (creds, setError) => {
    try {
      const user = await API.login(creds);
      setUser(user);
    } catch(e) {
      setError(e);
    }
  }

  const auth = {
    login
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.checkAuth();
        setUser(user);
      } catch (e) {
        console.log(e);
        setError(e);
      };
      setLoading(false);
    }
    checkAuth();
  }, []);

  return (
    <div className="App container">
    {loading && <h1>Checking login...</h1>}
    {!loading &&
      <AuthContext.Provider value={auth}>
        <BrowserRouter>
          <Header />
          {error && 
            <div className="alert alert-danger">Error {error.status}: {error.message}</div>
          }
          <h2>user is: {(user && user['username']) || 'undefined'}</h2>
          <Body />
        </BrowserRouter>
      </AuthContext.Provider>
    }
    </div>
  );
}

export default App;
