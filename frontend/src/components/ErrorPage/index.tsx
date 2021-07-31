import React from 'react'
import { ErrorTypes } from '../../types'
import sadFace from '../../../static/images/sad_face.png'
import { ErrorSadFace, Subtitle, Title } from '../common/styledHelpers'
import styled from 'styled-components'

interface Props {
  errorType: ErrorTypes
}

const ErrorContainer = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const ErrorPage: React.FC<Props> = ({ errorType }) => {
  const displayErrorMessage = () => {
    switch (errorType) {
    case ErrorTypes.Unauthorized:
      return 'You don\'t have permission to see this page.'
    case ErrorTypes.NotFound:
      return 'We couldn\'t find the resource you\'re looking for.'
    case ErrorTypes.NetworkError:
      return 'An error occured connecting to this page.'
    }
  }

  return (
    <ErrorContainer>
      <ErrorSadFace
        src={sadFace}
        alt=""
      />
      <Title>
        Oh no!
      </Title>
      <Subtitle>
        {displayErrorMessage()}
      </Subtitle>
    </ErrorContainer>
  )
}

export default ErrorPage