import Header from './Header';
import Body from './Body';

import AuthContext from './contexts/authContext';
import UserContext from './contexts/userContext';
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';

// Boostrap just needs to be imported here so JS for modals is available
import 'bootstrap';

function App() {

  const auth = useAuth();
  const user = useUser(auth.username, auth.authenticating);

  return (
    <div className="App container px-md-2 px-lg-5">
    {auth.authenticating && <h1>Checking login...</h1>}
    {(!auth.authenticating && user.loadingUser) && <h1>Loading...</h1>}
    {!user.loadingUser &&
      <AuthContext.Provider value={auth}>
        <UserContext.Provider value={user}>
          <Header />
          <Body />
        </UserContext.Provider>
      </AuthContext.Provider>
    }
    </div>
  );
}

export default App;
