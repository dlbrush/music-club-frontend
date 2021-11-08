import { Switch, Route, Redirect } from 'react-router-dom';
import RecentPosts from '../posts/RecentPosts';
import PublicClubsView from '../clubs/PublicClubsView';
import ClubContainer from '../clubs/ClubContainer';
import ClubPosts from '../posts/ClubPosts';
import ClubPostContainer from '../posts/ClubPostContainer';
import NewPost from '../posts/NewPost';
import EditPost from '../posts/EditPost';
import ClubMembers from '../clubs/ClubMembers';
import MyClubs from '../clubs/MyClubs';
import NewClub from '../clubs/NewClub';
import InviteUsers from '../clubs/InviteUsers';
import MyInvitations from '../invitations/MyInvitations';

const AuthRoutes = () => {
  return (
    <Switch>
      <Route exact path='/recent'>
        <RecentPosts />
      </Route>
      <Route exact path='/public-clubs'>
        <PublicClubsView />
      </Route>
      <Route exact path='/users/:username/invitations'>
        <MyInvitations />
      </Route>
      <Route exact 
             path='/users/:username/clubs' 
             render={({match}) => {
              return <MyClubs username={match.params.username}/>
             }
      }/>
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
             path='/clubs/:clubId/members' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={ClubMembers}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/new-post' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={NewPost}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/posts/:postId' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={ClubPostContainer}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/posts/:postId/edit' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={EditPost}/>
             }
      }/>
      <Route exact 
             path='/clubs/:clubId/invite-users' 
             render={({match}) => {
              return <ClubContainer clubId={match.params.clubId} ContentComponent={InviteUsers}/>
             }
      }/>
      <Route exact path='/new-club'>
       <NewClub />
      </Route>
      <Redirect to='/recent' />
    </Switch>
  )
}

export default AuthRoutes;