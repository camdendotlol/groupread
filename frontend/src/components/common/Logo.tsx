import React from 'react'
import styled from 'styled-components'
import logo from '../../../static/images/logo.png'

interface Props {
  size: string
}

// Accepts all valid CSS size styles as props
const LogoDiv = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};
`

const Logo: React.FC<Props> = ({ size }) => {
  return (
    <LogoDiv height={size} width={size} src={logo} alt='' />
  )
}

export default Logo