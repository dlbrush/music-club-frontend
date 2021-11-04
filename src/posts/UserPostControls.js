import { Link } from "react-router-dom";
import DeletePostButton from './DeletePostButton';

const UserPostControls = ({ post }) => {
  return (
    <div className="UserPostControls">
      <Link className="UserPostControls-edit btn btn-primary me-3" to={`/clubs/${post.clubId}/posts/${post.id}/edit`}>Edit Post</Link>
      <DeletePostButton clubId={post.clubId} postId={post.id} />
    </div>
  )
}

export default UserPostControls;