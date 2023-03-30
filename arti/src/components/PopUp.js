import React from 'react'
import '../index.css'

function PopUp(props) {
  return (props.trigger) ? (
    <div className='popups'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>
                close
            </button>
            {props.children}

        </div>
      
    </div>
  ) : "";

}

export default PopUp
