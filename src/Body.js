import AppNav from './AppNav';
import UnauthRoutes from './routes/UnauthRoutes';
import AuthRoutes from './routes/AuthRoutes';
import userContext from './contexts/userContext';

import { useContext } from 'react';

// Component separating the body of the doc into the Nav on the left and the Main content on the right
const Body = () => {
  const user = useContext(userContext);
  return (
    <div className="Body row">
      <AppNav />
      {!user &&
        <UnauthRoutes />
      }
      {user &&
        <AuthRoutes />
      }
    </div> 
  )
}

export default Body;