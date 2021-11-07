const EditCommentButton = ({ setEditMode }) => {

  const onClick = () => {
    setEditMode(true);
  }

  return <button className="EditCommentButton btn btn-primary me-3" onClick={onClick}>Edit Comment</button>
}

export default EditCommentButton;