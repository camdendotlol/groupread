import React, { useEffect, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { initializeUser } from './reducers/userReducer'
import { useAppDispatch } from './hooks'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
const GroupView = React.lazy(() => import('./components/GroupView'))
const GroupCreation = React.lazy(() => import('./components/GroupCreation'))
const NewPostForm = React.lazy(() => import('./components/NewPostForm'))
const GroupList = React.lazy(() => import('./components/GroupList'))
const PostView = React.lazy(() => import('./components/Posts'))
const GroupScheduler = React.lazy(() => import('./components/GroupScheduler'))
const Compatibility = React.lazy(() => import('./components/Compatibility'))
import './App.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Put the user into state as soon as they load the site
  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      <Navbar />
      {/* mobile-container doesn't do anything unless the user on on a small screen,
      in which case it provides side margins to all content, Unfortunately, it messes up
      the homepage picture, so we have to wrap each individual component in this div
      to avoid affecting the homepage. */}

      <div className='navbar-offset'>
        <Switch>
          <Route path="/groups/create">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <GroupCreation />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/schedule">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <GroupScheduler />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/submit">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <NewPostForm />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id/:pid">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <PostView />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups/:id">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <GroupView />
              </div>
            </Suspense>
          </Route>
          <Route path="/groups">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <GroupList />
              </div>
            </Suspense>
          </Route>
          <Route path="/compatibility">
            <Suspense fallback={<LoadingScreen />}>
              <div className="mobile-container">
                <Compatibility />
              </div>
            </Suspense>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default App