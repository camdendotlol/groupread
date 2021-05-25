import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getAllGroups } from '../../reducers/groupListReducer'
import { Link } from 'react-router-dom'
import GroupCard from './GroupCard'

const GroupList: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllGroups())
  }, [dispatch])

  const groups = useAppSelector(({ groupList }) => groupList)

  return (
    <div className='container has-text-centered pt-5 pb-4'>
      <h1 className='title'>
        All Groups
      </h1>
      <div className='columns is-centered'>
        <div className='group-list is-5'>
          {groups.map(group =>
          <Link className='hoverable-item' key={group.id} to={`/groups/${group.id}`}>
              <GroupCard
                bookTitle={group.bookTitle}
                bookAuthor={group.bookAuthor}
                bookOLID={group.bookOLID}
              />
            </Link>
            // <Link className='hoverable-item' key={group.id} to={`/groups/${group.id}`}>
            //   <div className='box mt-4 mb-4'>
            //     <div className='list-item has-text-centered'>
            //       <p className='is-size-5 has-text-primary'>
            //         <strong>{group.bookTitle}</strong> by {group.bookAuthor}
            //       </p>
            //     </div>
            //   </div>
            // </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupList