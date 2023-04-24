import React from 'react'
import { Spinner } from 'react-bootstrap'
import styles from '../styles/components/loading.module.css'
import Backdrop from './Backdrop'

export default function Loading() {
  return (
    <>
      <div className={`${styles['spinner-container']}`}>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
        <Backdrop className='pulsate'></Backdrop>
      </div>
    </>
  )
}
