import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { leaveGroup } from '../../reducers/groupReducer'
import ConfirmationBox from './ConfirmationBox'

interface Props {
  groupID: string
}

const LeaveGroupButton: React.FC<Props> = ({ groupID }) => {
  const dispatch = useAppDispatch()

  const [modalActive, setModalActive] = useState(false)

  const user = useAppSelector(({ user }) => user.data)

  if (!user) {
    return null
  }

  const handleGroupMembership = (id: string, token: string) => {
    dispatch(leaveGroup({
      id: id,
      token: token
    }))
  }

  return (
    <div className='has-text-right'>
      <ConfirmationBox
        text={'Are you sure you want to leave this group?'}
        callback={() => handleGroupMembership(groupID, user.token)}
        active={modalActive}
        setActive={setModalActive}
      />
      <button className='button is-danger is-small' type='button' onClick={() => setModalActive(true)}>
        Leave this group
      </button>
    </div>
  )
}

export default LeaveGroupButton