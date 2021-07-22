import React, { useState } from 'react'
import downArrow from '../../../static/svg/angle-down.svg'
import upArrow from '../../../static/svg/angle-up.svg'

interface Props {
  label: string,
  content: JSX.Element
}

const Dropdown: React.FC<Props> = ({ label, content }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)

  const handleArrow = () => (
    dropdownVisible
      ? <img className='dropdown-arrow' src={upArrow} />
      : <img className='dropdown-arrow' src={downArrow} />
  )

  const list = () => (
    <div className='box dropdown-list' onClick={() => setDropdownVisible(false)}>
      {content}
    </div>
  )

  return (
    <>
      <a
        role='button'
        className='navbar-item'
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {label}&#8200;{handleArrow()}
      </a>
      {dropdownVisible ? list() : null}
    </>
  )
}

export default Dropdown