import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import Post from './Post';

import API from '../api';

const ClubPostContainer = () => {
  const { postId } = useParams();
  const [ post, setPost ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await API.getPost(postId);
        setPost(post);
      } catch(e) {
        // Redirect home if they are not allowed to see this post
        history.push('/');
      }
      setLoading(false);
    }
    getPost();
  }, [history, postId]);

  if (loading) {
    return <h2 className="mt-2">Loading post...</h2>
  }

  return (
    <section className="ClubPostContainer">
      <h2 className="mt-4">Recommendation by {post.postedBy}</h2>
      <Post post={post} />
    </section>
  )
}

export default ClubPostContainer;