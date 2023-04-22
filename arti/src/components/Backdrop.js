import React from 'react'
import '../styles/backdrop.css'

export default function Backdrop({ page }) {
  return (
    <div className='backdrop-container'>
      {/* <div
        className={`${styles['bg-circle']} ${styles.circle1} ${styles[page]}`}
      ></div>
      <div
        className={`${styles['bg-circle']} ${styles.circle2} ${styles[page]}`}
      ></div>
      <div
        className={`${styles['bg-circle']} ${styles.circle3} ${styles[page]}`}
      ></div>
      <div
        className={`${styles['bg-circle']} ${styles.circle4} ${styles[page]}`}
      ></div> */}

      <div className='bg-circle radial-gradient circle'></div>
      <div className='bg-circle1 radial-gradient1 circle1'></div>
      <div className='bg-fill-circle switch-gradient'></div>
    </div>
  )
}
