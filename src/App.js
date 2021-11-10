import Header from './Header';
import Body from './Body';

import AuthContext from './contexts/authContext';
import UserContext from './contexts/userContext';
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';

// Boostrap just needs to be imported here so JS for modals is available
import bootstrap from 'bootstrap';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const auth = useAuth();
  const user = useUser(auth.username, auth.authenticating);

  return (
    <div className="App container px-md-2 px-lg-5">
    {auth.authenticating && <h1>Checking login...</h1>}
    {(!auth.authenticating && user.loadingUser) && <h1>Checking login...</h1>}
    {!user.loadingUser &&
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={user}>
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
