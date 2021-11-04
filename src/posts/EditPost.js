import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";

import ChosenAlbum from "./ChosenAlbum";
import EditPostForm from "../forms/EditPostForm";
import API from "../api";

const EditPost = () => {
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

  if (loading) return <h2>Loading post...</h2>
  
  return (
    <section className="EditPost row">
      <h3 className="mt-4 text-center">Edit your recommendation</h3>
      <ChosenAlbum className="col-4 border-end pt-4 text-center" album={post.album}/>
      <div className="col-8">
        <EditPostForm post={post}/>
      </div>
    </section>
  )
}

export default EditPost;