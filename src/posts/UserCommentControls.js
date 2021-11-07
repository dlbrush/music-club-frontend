import DeleteCommentButton from './DeleteCommentButton';
import EditCommentButton from './EditCommentButton';

const UserCommentControls = ({ comment, setEditMode, deleteComment }) => {
  return (
    <div className="UserPostControls">
      <EditCommentButton setEditMode={setEditMode} />
      <DeleteCommentButton commentId={comment.id} deleteComment={deleteComment}/>
    </div>
  )
}

export default UserCommentControls;