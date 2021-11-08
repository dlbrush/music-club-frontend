import { useContext, useState } from "react";
import UserContext from "../contexts/userContext";
import UserCommentControls from "./UserCommentControls";
import EditCommentForm from "../forms/EditCommentForm";

const Comment = ({ comment, deleteComment, editComment }) => {
  const postedAtDate = new Date(comment.postedAt);
  const [ editMode, setEditMode ] = useState(false);
  const { user } = useContext(UserContext);
  const ownPost = user.username === comment.username;

  if (editMode) return (
    <div className="Comment list-group-item">
      <EditCommentForm comment={comment} editComment={editComment} setEditMode={setEditMode}/>
    </div>
  )

  return (
    <li className="Comment list-group-item row d-flex">
      <div className="col-2 border-right">
        <img className="img-fluid" src={comment.user.profileImgUrl} alt=""/>
      </div>
      <div className="col-10">
        <p><small>{comment.username} commented:</small></p>
        <p>{comment.comment}</p>
        <p><small>{postedAtDate.toLocaleDateString()}</small></p>
        {ownPost && 
          <UserCommentControls comment={comment} setEditMode={setEditMode} deleteComment={deleteComment}/>
        }
      </div>
    </li>
  )
}

export default Comment;