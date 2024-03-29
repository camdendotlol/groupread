import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllGroups } from '../../reducers/groupListReducer'
import { Link } from 'react-router-dom'
import GroupCard from './GroupCard'
import { getPersonalInfo } from '../../reducers/userReducer'
import { Group } from '../../types'
import { TiledList } from '../common/styledHelpers'

const GroupList: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(({ user }) => user)

  useEffect(() => {
    dispatch(getAllGroups())
  }, [dispatch])

  useEffect(() => {
    if (user && user.data) {
      dispatch(getPersonalInfo({ id: user.data.id, token: user.data.token }))
    }
  }, [user?.data?.id])

  const groups = useAppSelector(({ groupList }) => groupList)

  // Identify groups that the user is a member of
  const getUserGroups = (): Group[] => {
    if (user && user.data?.Groups) {
      const userGroupIDs = user.data.Groups.map(g => g.id)
      const userGroups = groups.filter(g => userGroupIDs.includes(g.id))
      return userGroups
    } else {
      return [] as Group[]
    }
  }

  const getNonMemberGroups = (): Group[] => {
    if (user && user.data?.Groups) {
      const userGroupIDs = user.data.Groups.map(g => g.id)
      const nonMemberGroups = groups.filter(g => !userGroupIDs.includes(g.id))
      return nonMemberGroups
    } else {
      return groups
    }
  }

  const displayGroups = (groupsToShow: Group[], isMember: boolean) => {
    if (groupsToShow.length === 0) {
      return null
    } else {
      return (
        <div>
          <h1 className='title'>{ isMember ? 'Your Groups' : 'All Groups' }</h1>
          <TiledList>
            {groupsToShow.map(group =>
              <Link className='hoverable-item' key={group.id} to={`/groups/${group.id}`}>
                <GroupCard
                  bookTitle={group.bookTitle}
                  bookAuthor={group.bookAuthor}
                  bookOLID={group.bookOLID}
                />
              </Link>
            )}
          </TiledList>
        </div>
      )
    }
  }

  return (
    <div className='container has-text-centered pt-5 pb-4'>
      <div className='columns is-centered pb-5'>
        {displayGroups(getUserGroups(), true)}
      </div>
      <div className='columns is-centered'>
        {displayGroups(getNonMemberGroups(), false)}
      </div>
    </div>
  )
}

export default GroupList