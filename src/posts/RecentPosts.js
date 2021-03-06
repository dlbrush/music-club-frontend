import { useContext, useEffect, useState } from "react";
import UserContext from '../contexts/userContext';
import PostList from "./PostList";
import API from "../api";

const RecentPosts = () => {
  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await API.getRecentPosts(user.username);
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    getPosts();
  }, [user]);

  if (loading) return <h1 className="col-md-9 col-lg-10">Loading posts...</h1>

  return (
    <main className="RecentPosts col-md-9 col-lg-10">
      <h1 className="mt-4 border-bottom border-dark pb-2">Recent posts from your clubs</h1>
      {!posts.length &&
        <p>No recent posts! Join clubs to see posts.</p>
      }
      {posts.length > 0 &&
        <PostList posts={posts} showClub={true}/>
      }
    </main>
  )
}

export default RecentPosts;