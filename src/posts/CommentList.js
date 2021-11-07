import Comment from './Comment';

const CommentList = ({ comments, deleteComment, editComment }) => {
  return (
    <ul className="list-group">
      {comments.map((comment) => {
        return <Comment comment={comment} deleteComment={deleteComment} editComment={editComment} key={comment.id}/>
      })}
    </ul>
  )
}

export default CommentList;