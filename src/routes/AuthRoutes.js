import { Switch, Route, Redirect } from 'react-router-dom';
import RecentPosts from '../RecentPosts';
import Login from '../Login';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <RecentPosts />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default AuthRoutes;