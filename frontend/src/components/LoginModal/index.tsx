import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

interface Props {
  open: boolean,
  setOpen(boolean: boolean): void
}

const LoginModal: React.FC<Props> = ({ open, setOpen }) => {
  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const handleForm = () => {
    if (!showRegisterForm) {
      return <LoginForm setOpen={setOpen} />
    } else {
      return <RegisterForm setOpen={setOpen} />
    }
  }

  return (
    <div className={open ? 'modal is-active' : 'modal'}>
      <div className='modal-background' onClick={() => setOpen(false)} />
      <div className='modal-content'>
        <div className='box'>
          <div className='tabs'>
            <ul>
              <li className={showRegisterForm ? undefined : 'is-active'} onClick={() => setShowRegisterForm(false)}><a id='login-tab'>Log in</a></li>
              <li className={showRegisterForm ? 'is-active' : undefined} onClick={() => setShowRegisterForm(true)}><a id='register-tab'>Register</a></li>
            </ul>
          </div>
          {handleForm()}
        </div>
      </div>
      <button className='modal-close is-large' aria-label='close' onClick={() => setOpen(false)} />
    </div>
  )
}

export default LoginModal