import React from 'react'
import styled from 'styled-components'
import tempLogo from '../../../static/images/temp_logo.png'

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
    <LogoDiv height={size} width={size} src={tempLogo} alt='' />
  )
}

export default Logo