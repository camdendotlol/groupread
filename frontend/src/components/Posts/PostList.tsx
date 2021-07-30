import React from 'react'
import PostCard from './PostListItem'
import {
  Post,
} from '../../types'

interface Props {
  groupID: string,
  posts: Post[]
}

const PostList: React.FC<Props> = ({ groupID, posts }) => {
  const handlePosts = (posts: Array<Post>) => {
    if (posts.length === 0) {
      return (
        <p>No posts yet.</p>
      )
    }

    const parentPosts = posts.filter(p => !p.parent)

    return parentPosts.map(p => <PostCard
      key={p.id}
      groupID={groupID}
      post={p}
    />)
  }

  return (
    <div>
      {posts ? handlePosts(posts) : null}
    </div>
  )
}

export default PostList