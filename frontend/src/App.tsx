import React, { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
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
import { Container } from './components/common/styledHelpers'
import GlobalStyle from './globalStyles'

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
      {/* Unfortunately, the Container component messes up
      the homepage picture, so we have to wrap each individual component in it
      to avoid affecting the homepage. */}
      <main>
        <Routes>
          <Route
            path='/groups/create'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <GroupCreation />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/groups/:id/schedule'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <GroupScheduler />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/groups/:id/submit'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <NewPostForm />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/groups/:id/:pid'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <PostView />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/groups/:id'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <GroupView />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/groups'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <GroupList />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/compatibility'
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Container>
                  <Compatibility />
                </Container>
              </Suspense>
            }
          />
          <Route
            path='/'
            element={<HomePage />}
          />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App