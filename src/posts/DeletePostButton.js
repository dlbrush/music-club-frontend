import { useState } from "react";
import { useHistory } from "react-router";

import API from "../api";

const DeletePostButton = ({ postId, clubId }) => {
  const [disableDelete, setDisableDelete] = useState(false);
  const history = useHistory();

  const deletePost = async () => {
    setDisableDelete(true);
    try {
      await API.deletePost(postId);
      history.push(`/clubs/${clubId}`);
    } catch(e) {
      console.error(e);
    }
    setDisableDelete(false);
  }

  return <button className="DeletePostButton btn btn-danger" onClick={deletePost} disabled={disableDelete}>Delete Post</button>
}

export default DeletePostButton;