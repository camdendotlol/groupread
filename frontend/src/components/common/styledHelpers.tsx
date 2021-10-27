import styled from 'styled-components'

export const PrettyLink = styled.p`
  border: 3px solid #13BD9D;
  border-radius: 20px;
  padding: 10px;
  color: white;
  transition: background 0.15s;
  font-size: 1.5rem;
  text-align: center;

  :hover {
    background: #13BD9D;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem
  }
`

export const Title = styled.h1`
  font-size: 3.5rem;
  line-height: 1.125;
  font-weight: bolder;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 2.5rem
  }
`

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  line-height: 1.25;
  font-weight: bold;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 1.2rem
  }
`

export const Container = styled.div`
  margin: auto;
  max-width: 1260px;
  margin-bottom: 20px;
  
  /* offset for navbar */
  position: relative;
  top: 70px;
  min-height: calc(100vh - 70px);
  
  @media (max-width: 1407px) {
    max-width: 960px;
  }
  
  @media (max-width: 1022px) {
    margin-left: 10px;
    margin-right: 10px;
    max-width: 100%;
  }
`

export const TiledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

  a {
    width: 240px;
  }
`

export const DropdownList = styled.div`
  position: absolute;
  top: 48px;
  width: 400px;
  max-height: 600px;
  overflow: auto;

  ul a:hover, ul a:focus {
    background: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`

// Use system fonts for user-generated content such as posts
export const PostTypography = styled.div`
  font-family: system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`

export const ErrorSadFace = styled.img`
  height: 128px;
  width: 128px;
  margin: 0 auto;

  @media (max-width: 640px) {
    height: 72px;
    width: 72px;
  }
`

export const CenteredDiv = styled.div`
  text-align: center;
`