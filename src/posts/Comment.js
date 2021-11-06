const Comment = ({ comment }) => {
  return (
    <li className="Comment list-group-item row">
      <div className="col-3 border-right">
        <img className="img-fluid" src={comment.user.profileImgUrl} alt=""/>
        <p>{comment.user.username}</p>
      </div>
    </li>
  )
}

export default Comment;