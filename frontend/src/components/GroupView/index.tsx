import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams, useHistory } from 'react-router-dom'
import { getGroupDetails, getGroupMembers, getGroupPosts } from '../../reducers/groupReducer'
import GroupBanner from './GroupBanner'
import PostList from '../Posts/PostList'
import MembersList from './MembersList'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Group,
  User,
  ErrorTypes
} from '../../types'
import LeaveGroupButton from '../common/LeaveGroupButton'
import LoadingScreen from '../LoadingScreen'
import ErrorPage from '../ErrorPage'

const GroupView: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const dispatch = useAppDispatch()
  const history = useHistory()

  const userState = useAppSelector(({ user }) => user)
  const user = userState.data
  const groupState = useAppSelector(({ group }) => group)
  const groups = groupState.groups

  // See if the group exists in the cache
  const groupQuery = groups.find(group => group.id === id)

  // Set these up so they can be filled in later if applicable
  let members: Array<User> = []
  let memberIDs: Array<string> = []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const getInfo = async () => {
      await dispatch(getGroupDetails(id))
      await dispatch(getGroupMembers(id))
    }

    getInfo()
  }, [id])

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(getGroupPosts(id))
    }

    if (user) {
      getPosts()
    }
  }, [id, user])

  if (groupState.pending.details || groupState.pending.members || userState.loading) {
    return <LoadingScreen />
  }

  // Now we can have a properly typed group object with
  // the possibility of being undefined out of the way
  if (!groupQuery) {
    return <ErrorPage errorType={ErrorTypes.NotFound} />
  }
  const group: Group = groupQuery

  // Fill in the members list
  members = group.members ? group.members : []
  memberIDs = members.map(m => m.id)

  if (group.id !== id || !members) {
    return <LoadingScreen />
  }

  const handlePostButton = () => {
    if (!user) return null

    if (!memberIDs.includes(user.id)) return null

    return (
      <button className='button is-primary level-item' onClick={() => history.push(`/groups/${group.id}/submit`)}>
          New Post
      </button>
    )
  }

  const handleLoggedInContent = () => {
    if (!user || !memberIDs.includes(user.id)) {
      return null
    }

    return (
      <>
        <div className='level is-mobile'>
          <div className='level-left'>
            <h1 className='title level-item'>Posts</h1>
          </div>
          <div className='level-right'>
            {handlePostButton()}
          </div>
        </div>
        <PostList groupID={id} posts={group.posts} />
      </>
    )
  }

  const handleBanner = () => {
    if (group) {
      return <GroupBanner group={group} />
    }
  }

  const handleLeaveButton = () => {
    if (user && memberIDs.includes(user.id) && group.AdminId !== user.id) {
      return <LeaveGroupButton groupID={group.id} />
    }
  }

  return (
    <div className='is-centered'>
      {handleBanner()}
      {handleLoggedInContent()}
      <MembersList
        adminID={group.AdminId}
        groupMembers={members}
      />
      {handleLeaveButton()}
    </div>
  )
}

export default GroupView
