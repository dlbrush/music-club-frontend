import { Link } from 'react-router-dom';

import '../css/PostCard.css';

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <Link className="list-group-item list-group-item-active row d-flex">
      <div className="col-12 col-md-4 text-center">
        <h5>{post.album.title}</h5>
        <p className="lead">{post.album.artist}</p>
        <img className="img-fluid PostCard-image mb-2" src={post.album.coverImgUrl} alt={`Album cover for ${post.album.title}`} />
        <p>{post.album.year}</p>
      </div>
      <div className="col-12 col-md-8">
        <p className="fst-italic">{post.content}</p>
        {post.recTracks && <p>Recommended Tracks: {post.recTracks}</p>}
        <p>Posted by: {post.postedBy}</p>
      </div>
    </Link>
  )
}

export default PostCard;