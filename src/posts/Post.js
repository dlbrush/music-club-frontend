import { useContext } from "react";

import UserPostControls from "./UserPostControls";
import UserContext from "../contexts/userContext";

const Post = ({ post }) => {
  const user = useContext(UserContext);
  const ownPost = post.postedBy === user.username;

  return (
    <article className={`Post row`}>
      <div className="col-12 col-md-4 text-center border-end">
        <img src={post.album.coverImgUrl} className="img-fluid mt-3" alt={`Cover art for ${post.album.title}`}/>
        <h3 className="mt-2 mb-1">{post.album.title}</h3>
        <p className="lead mb-1">{post.album.artist}</p>
        <p className="mb-1">{post.album.genres.join(', ')}</p>
        <p>{post.album.year}</p>
      </div>
      <div className="col-12 col-md-8">
        {post.content && 
          <div className="Post-content mt-2">
            <p className="mb-2 border-bottom"><small>Post</small></p>
            <p className="fst-italic">"{post.content}"</p>
          </div>
        }
        {post.recTracks && 
          <div className="Post-rec-tracks mt-4">
            <p className="mb-2  border-bottom"><small>Recommended Tracks</small></p>
            <p>{post.recTracks}</p>
          </div>
        }
        {ownPost && <UserPostControls post={post}/>}
      </div>
    </article>
  )
}

export default Post;