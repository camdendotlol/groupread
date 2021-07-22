import React from 'react'

// Simple popup modal to ask the user if they're sure they want to do something
// Requires:
// 1) a callback function to do the thing you're asking the user to do
// 2) text to display, e.g. "Are you sure you want to delete your account?"
// 3) boolean value to decide whether the modal is visible or not
// 4) a setActive callback function so we can make the modal inactive from within the modal

interface Props {
  text: string,
  callback: () => void,
  active: boolean,
  setActive: (arg: boolean) => void
}

const ConfirmationBox: React.FC<Props> = ({ text, callback, active, setActive }) => {
  return (
    <div className={active ? 'is-active modal' : 'modal' }>
      <div className='modal-background' onClick={() => setActive(false)} />
      <div className='modal-content'>
        <div className='box has-text-centered'>
          <h2 className='subtitle'>{text}</h2>
          <div className='is-flex is-flex-wrap-wrap is-justify-content-right'>
            <button
              onClick={() => callback()}
              className='button is-success mx-2'
            >
              Yes
            </button>
            <button
              onClick={() => setActive(false)}
              className='button is-danger mx-2'
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationBox