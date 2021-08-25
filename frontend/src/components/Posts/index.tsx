import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { getGroupDetails, getGroupMembers, getGroupPosts } from '../../reducers/groupReducer'
import PostDisplay from './PostDisplay'
import PostForm from './PostForm'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import {
  ErrorTypes, Post
} from '../../types'

import { PostPayloadType } from './PostForm'
import ErrorPage from '../ErrorPage'
import LoadingScreen from '../LoadingScreen'

const PostView: React.FC = () => {
  const dispatch = useAppDispatch()
  const { id, pid } = useParams<({ id: string, pid: string })>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    dispatch(getGroupDetails(id))
    dispatch(getGroupPosts(id))
    dispatch(getGroupMembers(id))
  }, [id])

  const userState = useAppSelector(({ user }) => user)
  const user = userState.data
  const groupState = useAppSelector(({ group }) => group)
  const group = groupState.groups.find(group => group.id === id)

  if (!user && !userState.loading) {
    return (
      <ErrorPage errorType={ErrorTypes.Unauthorized} />
    )
  }

  if (groupState.pending.details || groupState.pending.posts || groupState.pending.members) {
    return (
      <LoadingScreen />
    )
  }

  if (!group) {
    return (
      <ErrorPage errorType={ErrorTypes.NotFound} />
    )
  }

  const post = group.posts.find((post: Post) => post.id === pid)

  if (!post) {
    return (
      <ErrorPage errorType={ErrorTypes.NotFound} />
    )
  }

  const displayReplies = () => {
    // Check if there are any replies first
    if (post.replies && post.replies.length > 0) {
      return post.replies.map((reply: Post) =>
        <PostDisplay key={reply.id} postObject={reply} />
      )
    } else {
      return (
        <p className='subtitle'>No replies yet.</p>
      )
    }
  }

  return (
    <div className='container pt-4 pb-4'>
      <h1 className='title'>{post.title}</h1>
      <PostDisplay
        postObject={post}
      />
      <br />
      <h1 className='title is-4'>Replies</h1>
      {displayReplies()}
      <h1 className='subtitle'>Reply</h1>
      <PostForm
        payloadType={PostPayloadType.New}
        startingText={null}
        replyID={null}
        setActive={null}
      />
    </div>
  )
}

export default PostView