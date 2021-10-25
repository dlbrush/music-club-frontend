import { Switch, Route, Redirect } from 'react-router-dom';
import Splash from './Splash';
import Login from './Login';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Splash />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default MainRoutes;