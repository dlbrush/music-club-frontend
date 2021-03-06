import { useEffect, useState } from 'react';

import PostList from './PostList';
import API from '../api';

const ClubPosts = ({ club }) => {
  const [ clubPosts, setClubPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const getClubPosts = async () => {
      setError(null);
      try {
        const clubPosts = await API.getClubPosts(club.id);
        setClubPosts(clubPosts);
      } catch(e) {
        console.warn(e);
        setError(e);
      }
      setLoading(false);
    }
    getClubPosts();
  },[club])

  if (loading) {
    return <h2 className="mt-3">Loading posts...</h2>
  }
  if (error) {
    return <h2 className="mt-3">Unable to load posts: {error.message}</h2>
  }

  return (
    <div className="ClubPosts mt-3">
      <h2>Posts</h2>
      {clubPosts.length > 0 &&
        <PostList posts={clubPosts} />
      }
      {!clubPosts.length &&
        <p>No posts yet!</p>
      }
    </div>
  );
}

export default ClubPosts;