import { useState } from "react";

import API from "../api";

const DeleteCommentButton = ({ commentId, deleteComment }) => {
  const [ disableDelete, setDisableDelete ] = useState(false);

  const onDelete = async () => {
    setDisableDelete(true);
    try {
      await API.deleteComment(commentId);
      deleteComment(commentId);
    } catch(e) {
      console.error(e);
      setDisableDelete(false);
    }
  }

  return <button className="DeleteCommentButton btn btn-danger" onClick={onDelete} disabled={disableDelete}>Delete Comment</button>
}

export default DeleteCommentButton;