import Header from './Header';
import Body from './Body';

import AuthContext from './contexts/authContext';
import UserContext from './contexts/userContext';
import useAuth from './hooks/useAuth';

import { BrowserRouter } from 'react-router-dom';

function App() {

  const auth = useAuth();

  return (
    <div className="App container">
    {auth.authenticating && <h1>Checking login...</h1>}
    {!auth.authenticating &&
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={auth.user}>
          <BrowserRouter>
            <Header />
            <Body />
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    }
    </div>
  );
}

export default App;
