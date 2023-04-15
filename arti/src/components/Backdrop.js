import React from 'react'
import styles from '../styles/components/backdrop.module.css'

export default function Backdrop({ circleSize, lineSize }) {
  return (
    <>
      <div className={`${styles['bg-circle']} ${styles.circle1}`}></div>
      <div className={`${styles['bg-circle']} ${styles.circle2}`}></div>
      <div className={`${styles['bg-circle']} ${styles.circle3}`}></div>
      <div className={`${styles['bg-circle']} ${styles.circle4}`}></div>

      <div className={`${styles['tiny-lines']} ${styles.line1}`}></div>
      <div className={`${styles['tiny-lines']} ${styles.line2}`}></div>
      <div className={`${styles['tiny-lines']} ${styles.line3}`}></div>
      <div className={`${styles['tiny-lines']} ${styles.line4}`}></div>
    </>
  )
}
