import React from 'react'
import { Link } from 'react-router-dom'
import { ExitButton, FullScreenContainer, MenuList } from './styledComponents'

interface Props {
  showSidebar: boolean,
  setShowSidebar: (arg: boolean) => void
}

const MobileSidebar: React.FC<Props> = ({ showSidebar, setShowSidebar }) => {
  return (
    <FullScreenContainer property={showSidebar ? '-100%' : '0'}>
      <ExitButton
        onClick={() => setShowSidebar(false)}
      >
        X
      </ExitButton>
      <MenuList>
        <li><Link to='/' onClick={() => setShowSidebar(false)}>Home</Link></li>
        <li><Link to='/groups' onClick={() => setShowSidebar(false)}>Browse Groups</Link></li>
        <li><Link to='/groups/create' onClick={() => setShowSidebar(false)}>Create a group</Link></li>
        <div className='sidebar-footer'>
          <p>Made in Kentucky</p>
          <p>by Camden Mecklem</p>
          <p>with React, Express, and Postgres</p>
        </div>
      </MenuList>
    </FullScreenContainer>
  )
}

export default MobileSidebar