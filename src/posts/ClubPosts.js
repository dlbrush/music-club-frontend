import { useEffect, useState } from 'react';

import PostList from './PostList';
import API from '../api';

const ClubPosts = ({ club }) => {
  const [ clubPosts, setClubPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState()

  useEffect(() => {
    const getClubPosts = async () => {
      try {
        const clubPosts = await API.getClubPosts(club.id);
        setClubPosts(clubPosts);
      } catch(e) {
        console.warn(e);
        setError(true);
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
      <PostList posts={clubPosts} />
    </div>
  );
}

export default ClubPosts;