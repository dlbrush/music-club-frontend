import PostCard from './PostCard';

const PostList = ({ posts, showClub }) => {
  return (
    <ul className="list-group">
      {posts.map(post => {
        return <PostCard post={post} showClub={showClub}/>
      })}
    </ul>
  )
}

export default PostList;