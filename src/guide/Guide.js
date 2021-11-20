import '../css/Guide.css';
import QuickstartImage from './quickstart.png';
import ExamplePost from './examplePost.png';
import ExampleAlbumSearch from './exampleAlbumSearch.png';
import ExampleClub from './exampleClub.png';
import PublicClubs from './publicClubs.png';
import ExampleNewPost from './exampleNewPost.png';

const Guide = () => {
  return (
    <main className="Guide col-md-9 col-lg-10">
      <div className="Guide-banner d-flex align-items-center justify-content-center">
        <h2 className="Guide-banner-text p-2 display-2 text-white d-flex text-center">How to use Music Club</h2>
      </div>
      <h3 className="h4 mt-4">Table of Contents</h3>
      <nav className="mb-3 pt-3 border-top border-bottom">
        <ol>
          <li>Quickstart</li>
          <li>
            Clubs
            <ol>
              <li>Starting a club</li>
              <li>Public clubs</li>
              <li>Invitations and joining clubs</li>
            </ol>
          </li>
          <li>Making a post</li>
        </ol>
      </nav>
      <article id="#quickstart" className="my-3 border-bottom">
        <h4>Quick start guide</h4>
        <img className="Guide-image border d-block mx-auto" src={QuickstartImage} alt="The interface for starting a new club."/>
        <ol className="my-3">
          <li>Register for an account, or log in with your existing account! Having an account allows you to join clubs and make posts.</li>
          <li>Check out the list of public clubs, which can be found in the navigation bar. Click on a club name.</li>
          <li>When you open a club, you'll see a list of posts. Click on a post to see more details.</li>
          <img className="Guide-image border d-block my-3 mx-auto" src={ExamplePost} alt="An example post."/>
          <li>Click "Members" in the navigation bar at the top of a club page to see the list of members.</li>
          <li>Now that you've seen some clubs, find one you'd like to join and click the "Join Club" button. Or, if none of the clubs suit your fancy, maybe it's time to start your own club - if you want to do that, click on "New Club" in the navigation bar, and add a name and description for your club. Add a link to the image you'd like for your banner - or wait for later, since that's optional. Make it a private club for you and your friends, or a public club for the world to see - totally up to you!</li>
          <li>Now that you're a club member, you can add your own posts. Click "My clubs" in the navigation bar to find the club you just joined. Click on it to open it. You should now have a "New Post" button to click in the nav bar.</li>
          <li>First, you'll need to find an album to recommend. Search by title or artist name. You'll see results from the <a href="www.discogs.com">Discogs</a> album database.</li>
          <img className="Guide-image border d-block my-3 mx-auto" src={ExampleAlbumSearch} alt="Search results for a user looking for a Daft Punk album."/>
          <li>Once you've chosen an album, click "Next" to move on to filling out the details of your post. Say something about the album and list out the tracks on the album that you recommend. You can write anything in these fields. Click "Post" to add your post.</li>
          <li>Your post is now at the top of the club for everyone to see! Other users in the club can comment on your post - maybe it's time to invite some of your friends to the club to talk about it, using the "Invite Users" button?</li>
          <li>And that's it! Welcome to the club - check in every day to see new posts or talk about what you're listening to.</li>
        </ol>
      </article>
      <article className="my-3 border-bottom">
        <h4 id="#clubs">Clubs</h4>
        <img className="Guide-image border d-block mx-auto" src={ExampleClub} alt="The homepage of a club with no posts."/>
        <p className="mt-3">A club is where the action happens in Music Club. Clubs are where you can make posts and comment on others' posts. Find a club posting music you're interested in or have a friend invite you to theirs!</p>
        <h5 className="my-3 pt-4 border-top" id="#clubs-starting">Starting a club</h5>
        <img className="Guide-image border d-block mx-auto" src={QuickstartImage} alt="The interface for starting a new club."/>
        <ul className="my-4">
          <li>Any user can start a new club! Just click "New Club" in the navigation bar to open the interface for starting a club.</li>
          <li>Clubs require a title and description - For a public club, a descriptive name and detailed description is great for attracting and explaining your club to new users. But for a private club, this can be anything.</li>
          <li>The banner image should be a valid full url (starting with "http://" or "https://"). The app will scale your image to fit the page horizontally, so there's no particular size to stick to here, but a good banner will look good horizontally across the whole screen.</li>
          <li>Make sure to be conscious of deciding whether your club is public or private! You can't change this once it's decided unless you delete the club. See the section below to see what users who aren't members will be able to see in a Public club.</li>
        </ul>        
        <h5 className="my-3 pt-4 border-top" id="#clubs-public">Public Clubs</h5>
        <img className="Guide-image border d-block mx-auto" src={PublicClubs} alt="A list of public clubs."/>
        <ul className="my-4">
          <li>Any club created as public is visible to all Music Club users. Click "Public Clubs" in the navigation bar to see a list of all active public clubs.</li>
          <li>Users who are not members of the club are able to see all posts and members in a given club. This is meant to give you a taste of who's posting what in this club.</li>
          <li>You are not able to make new posts until you join a public club. You are also not able to see or make comments as a user who is not a member of a club.</li>
          <li>If you want to start making posts in a public club, click the "Join Club" button on the club page at any time to instantly join.</li>
        </ul>
        <h5 className="my-3 pt-4 border-top" id="#clubs-joining">Invitations and joining clubs</h5>
        <ul className="my-4">
          <li>You can invite users to any club you're a member of. From the club page, choose "invite users" from the navigation menu, and search by username for the user you'd like to invite. You cannot send invitations to users who are already in the club or are already invited.</li>
          <li>After you send an invite, that user should be able to see it in their Invitations view, which can be accessed from the  navigation bar. If you have a new invitation, there will be a red badge next to the Invitations button showing the number of new invitations. Click "join club" on an invitation to see the club.</li>
          <li>Public clubs can be joined via the button at the top of a club page, but you can also send invitations to a public club you're a member of. Private clubs can only be joined via invitation.</li>
        </ul>
      </article>
      <article id="#posts" className="my-3 border-bottom">
        <h4>Making a post</h4>
        <ol className="my-3">
          <li>You can make a post in any club you're a member of. To start a new post, navigate to the club page and click on "New Post" in the navigation menu.</li>
          <li>The first step is selecting an album to recommend. Music Club uses the Discogs database to get a list of album releases. Search by Title, Artist, or both.</li>
          <img className="Guide-image border d-block my-3 mx-auto" src={ExampleAlbumSearch} alt="Search results for a user looking for a Daft Punk album."/>
          <li>Once you've chosen an album, click "Next" at the top of the list of albums to move on to filling out the details of your post. Say something about the album and list out the tracks on the album that you recommend. You can write anything in these fields. Click "Post" to add your post.</li>
          <img className="Guide-image border d-block my-3 mx-auto" src={ExampleNewPost} alt="The form for filling out a new post."/>
          <li>Your post is now at the top of the club for everyone to see! Other users in the club can comment on your post using the input field at the bottom of the post.</li>
          <li>To update or delete a post, navigate to the post after you've created it and click the buttons to edit or delete.</li>
        </ol>
      </article>
    </main>
  )
}

export default Guide;