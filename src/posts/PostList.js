import PostCard from './PostCard';

const PostList = ({ posts }) => {
  return (
    <ul className="list-group">
      {posts.map(post => {
        return <PostCard post={post}/>
      })}
    </ul>
  )
}

export default PostList;