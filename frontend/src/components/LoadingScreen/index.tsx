import React from 'react'
import loadingImage from '../../../static/svg/loading.svg'

const LoadingScreen: React.FC = () => {
  return (
    <div className='hero is-fullheight-with-navbar'>
      <div className='hero-body is-justify-content-center'>
        <div className='has-text-centered'>
          <img className='loading-icon' src={loadingImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen