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
  top: 52px;
`