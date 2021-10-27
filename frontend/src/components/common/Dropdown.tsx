import React, { useState } from 'react'
import styled from 'styled-components'
import downArrow from '../../../static/svg/angle-down.svg'
import upArrow from '../../../static/svg/angle-up.svg'
import { DropdownList } from './styledHelpers'

interface Props {
  label: string,
  content: JSX.Element
}

const Arrow = styled.img`
  filter: invert(100%);
  height: 16px;
  width: 16px;
  align-self: center;
`

const DropdownButton = styled.a`
  display: inline-flex;
  align-items: center;
`

const Dropdown: React.FC<Props> = ({ label, content }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)

  const handleArrow = () => (
    dropdownVisible
      ? <Arrow src={upArrow} />
      : <Arrow src={downArrow} />
  )

  const list = () => (
    <DropdownList className='box' onClick={() => setDropdownVisible(false)}>
      {content}
    </DropdownList>
  )

  return (
    <>
      <DropdownButton
        role='button'
        className='navbar-item'
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {label}&#8200;{handleArrow()}
      </DropdownButton>
      {dropdownVisible ? list() : null}
    </>
  )
}

export default Dropdown