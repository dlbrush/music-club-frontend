import { Switch, Route, Redirect } from 'react-router-dom';
import RecentPosts from '../posts/RecentPosts';
import PublicClubsView from '../clubs/PublicClubsView';
import ClubContainer from '../clubs/ClubContainer';
import ClubPosts from '../clubs/ClubPosts';
import NewPost from '../posts/NewPost';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/recent'>
        <RecentPosts />
      </Route>
      <Route exact path='/public-clubs'>
        <PublicClubsView />
      </Route>
      <Route exact 
             path='/clubs/:clubId' 
             render={({match}) => {
              return <Redirect to={`/clubs/${match.params.clubId}/posts`}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/posts' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={ClubPosts}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/new-post' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={NewPost}/>
             }
      }/>
      <Redirect to='/recent' />
    </Switch>
  )
}

export default AuthRoutes;