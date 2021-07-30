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
              <div className="mobile-container navbar-offset">
                <GroupCreation />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/schedule">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <GroupScheduler />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/submit">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <NewPostForm />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/:pid">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <PostView />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <GroupView />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <GroupList />
              </div>
            </Suspense>
          </Route>
          <Route path="/compatibility">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container navbar-offset">
                <Compatibility />
              </div>
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