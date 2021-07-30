import React, { useEffect, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { initializeUser } from './reducers/userReducer'
import { useAppDispatch } from './hooks'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './components/HomePage'
const GroupView = React.lazy(() => import('./components/GroupView'))
const GroupCreation = React.lazy(() => import('./components/GroupCreation'))
const NewPostForm = React.lazy(() => import('./components/NewPostForm'))
const GroupList = React.lazy(() => import('./components/GroupList'))
const PostView = React.lazy(() => import('./components/Posts'))
const GroupScheduler = React.lazy(() => import('./components/GroupScheduler'))
const Compatibility = React.lazy(() => import('./components/Compatibility'))
import './App.scss'
import { createGlobalStyle } from 'styled-components'
import { Container } from './components/common/styledHelpers'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: $family-sans-serif, sans-serif;
  }

  ::selection {
    background: rgba(137, 207, 240, 0.5);
  }
`

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Put the user into state as soon as they load the site
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <>
      <GlobalStyle />
      <Navbar />
      {/* mobile-container navbar-offset doesn't do anything unless the user on on a small screen,
      in which case it provides side margins to all content, Unfortunately, it messes up
      the homepage picture, so we have to wrap each individual component in this div
      to avoid affecting the homepage. */}
      <main>
        <Switch>
          <Route path="/groups/create">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <GroupCreation />
              </Container>
            </Suspense>
          </Route>
          <Route path="/groups/:id/schedule">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <GroupScheduler />
              </Container>
            </Suspense>
          </Route>
          <Route path="/groups/:id/submit">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <NewPostForm />
              </Container>
            </Suspense>
          </Route>
          <Route path="/groups/:id/:pid">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <PostView />
              </Container>
            </Suspense>
          </Route>
          <Route path="/groups/:id">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <GroupView />
              </Container>
            </Suspense>
          </Route>
          <Route path="/groups">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <GroupList />
              </Container>
            </Suspense>
          </Route>
          <Route path="/compatibility">
            <Suspense fallback={<LoadingScreen />}>
              <Container>
                <Compatibility />
              </Container>
            </Suspense>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App