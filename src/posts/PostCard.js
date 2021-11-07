import { Link } from 'react-router-dom';

import '../css/PostCard.css';

const PostCard = ({ post, showClub }) => {
  const postedAtDate = new Date(post.postedAt);
  return (
    <Link className="list-group-item list-group-item-active row d-flex mt-2" to={`/clubs/${post.clubId}/posts/${post.id}`}>
      <div className="col-12 col-md-6 row text-center align-items-center">
        <div className="col-6 text-center">
          <img className="img-fluid PostCard-image mb-2" src={post.album.coverImgUrl} alt={`Album cover for ${post.album.title}`} />
          <p>{post.album.year}</p>
        </div>
        <div className="col-6 text-center">
          <h5>{post.album.title}</h5>
          <p className="lead">{post.album.artist}</p>
        </div>
      </div>
      <div className="col-12 col-md-6 border-start">
        {showClub && <p><small>Posted in {post['clubName']}</small></p>}
        <p className="fst-italic">"{post.content}"</p>
        {post.recTracks && <p>Recommended Tracks: {post.recTracks}</p>}
        <p><small>Posted by {post.postedBy}, {postedAtDate.toLocaleDateString()}</small></p>
      </div>
    </Link>
  )
}

export default PostCard;