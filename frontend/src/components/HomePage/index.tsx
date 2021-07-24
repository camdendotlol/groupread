import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAppSelector } from '../../hooks'
import Logo from '../common/Logo'
import { Title, Subtitle, PrettyLink } from '../common/styledHelpers'
import LoginModal from '../LoginModal'

const BannerDiv = styled.section`
  height: 100vh;
  display: flex;
  flex-flow: column;
  gap: 20px;
  justify-content: center;
  background: linear-gradient(45deg, #000850 0%, #000320 100%), radial-gradient(100% 225% at 100% 0%, #FF6928 0%, #b94e48 100%), linear-gradient(225deg, #3cb371 0%, #000000 100%), linear-gradient(135deg, #bc8f8f 10%, #bc8f8f 35%, #757763 35%, #757763 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%);
  background-blend-mode: screen, overlay, hard-light, normal;
`

const HomepageInfo = styled.div`
  margin: 0 auto;
  color: white;
  text-align: center;
`

const HomepageButtons = styled.div`
  margin: 0 auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 640px) {
    flex-flow: column;
  }
`

const LoginButton = styled.div`
  :hover {
    cursor: pointer;
  }
`

const HomePage: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const user = useAppSelector(({ user }) => user.data)

  const handleLoginButton = () => {
    if (user) {
      return null
    } else {
      return (
        <LoginButton>
          <LoginModal open={loginModalOpen} setOpen={setLoginModalOpen} />
          <PrettyLink onClick={() => setLoginModalOpen(true)}>Log in or Register</PrettyLink>
        </LoginButton>
      )
    }
  }

  return (
    <BannerDiv id='home-page'>
      <HomepageInfo>
        <Logo size={'7rem'} />
        <Title>Groupread</Title>
        <Subtitle>Read books with your friends.</Subtitle>
      </HomepageInfo>
      <HomepageButtons>
        <Link to='/groups' id='group-list-link'>
          <PrettyLink>Browse Groups</PrettyLink>
        </Link>
        {handleLoginButton()}
        <a href='https://github.com/mythmakerseven/groupread'>
          <PrettyLink>Code</PrettyLink>
        </a>
      </HomepageButtons>
    </BannerDiv>
  )
}

export default HomePage