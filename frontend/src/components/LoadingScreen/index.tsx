import React from 'react'
import styled from 'styled-components'
import loadingImage from '../../../static/svg/loading.svg'

const LoadingIcon = styled.img`
  margin: 0 auto;
`

const LoadingScreen: React.FC = () => {
  return (
    <div className='hero is-fullheight-with-navbar'>
      <div className='hero-body is-justify-content-center'>
        <div className='has-text-centered'>
          <LoadingIcon
            src={loadingImage}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen