import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import Post from './Post';
import CommentForm from "../forms/CommentForm";

import API from '../api';

const ClubPostContainer = ({ isMember }) => {
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

  const addComment = (comment) => {
    setPost(post => {
      post.comments = [...post.comments, comment];
      return post;
    })
  }

  if (loading) {
    return <h2 className="mt-2">Loading post...</h2>
  }

  return (
    <section className="ClubPostContainer mb-5">
      <h2 className="mt-4">Recommendation by {post.postedBy}</h2>
      <Post post={post} />
      {isMember && 
        <div className="ClubPostContainer-user-view">
          <CommentForm postId={postId} addComment={addComment}/>
        </div>
      }
    </section>
  )
}

export default ClubPostContainer;