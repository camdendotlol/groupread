import React from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import {
  Post
} from '../../types'
import styled from 'styled-components'

interface Props {
  groupID: string,
  post: Post
}

const PostContent = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PostCard: React.FC<Props> = ({ groupID, post }) => (
  <Link className='hoverable-item' key={post.id} to={`/groups/${groupID}/${post.id}`}>
    <div className='card my-4'>
      <div className='card-content'>
        <p><strong className='has-text-primary is-size-5'>{post.title}</strong></p>
        <p><strong><PostContent>{post.text}</PostContent></strong></p>
        <p>posted {dayjs().to(dayjs(post.createdAt))} by <strong>{post.User.displayName}</strong> &#183; {post.replies ? post.replies.length : 0} replies</p>
      </div>
    </div>
  </Link>
)

export default PostCard