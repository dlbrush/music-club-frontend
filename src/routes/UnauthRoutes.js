import { Switch, Route, Redirect } from 'react-router-dom';
import Splash from '../Splash';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Guide from '../guide/Guide';

const UnauthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Splash />
      </Route>
      <Route exact path='/guide'>
        <Guide />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/register'>
        <Register />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default UnauthRoutes;