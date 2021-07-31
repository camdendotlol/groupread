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
  font-size: 4rem;
  line-height: 90%;

  @media (max-width: 640px) {
    font-size: 2.5rem
  }
`

export const Subtitle = styled.h2`
  font-size: 2rem;

  @media (max-width: 640px) {
    font-size: 1.2rem
  }
`

export const Container = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  /* offset for navbar */
  position: relative;
  top: 50px;
  min-height: calc(100vh - 50px);
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
  width: 25vw;
  max-height: 40vh;
  overflow: auto;

  // avoid some weird behavior from the burger menu
  z-index: 1000;

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