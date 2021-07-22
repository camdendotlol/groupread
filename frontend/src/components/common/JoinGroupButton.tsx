import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { joinGroup } from '../../reducers/groupReducer'

interface Props {
  groupID: string
}

const JoinGroupButton: React.FC<Props> = ({ groupID }) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector(({ user }) => user.data)

  if (!user) {
    return null
  }

  const handleGroupMembership = (id: string, token: string) => {
    dispatch(joinGroup({
      id: id,
      token: token
    }))
  }

  return (
    <button className='button is-link' type='button' onClick={() => handleGroupMembership(groupID, user.token)}>
      Join
    </button>
  )
}

export default JoinGroupButton