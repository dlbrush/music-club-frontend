import Header from './Header';
import Body from './Body';
import API from './api';
import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

function App() {

  const [ user, setUser ] = useState(undefined);
  const [ error, setError ] = useState(undefined);
  const [ loading, setLoading ] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.checkAuth();
        setUser(user);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    }
    checkAuth();
  });

  return (
    <div className="App container">
    {loading && <h1>Loading...</h1>}
    {!loading && 
      <BrowserRouter>
        <Header />
        {error && 
          <div className="alert alert-danger">Error: {error.status}</div>
        }
        <h2>user is: {(user && user['username']) || 'undefined'}</h2>
        <Body />
      </BrowserRouter>
    }
    </div>
  );
}

export default App;
