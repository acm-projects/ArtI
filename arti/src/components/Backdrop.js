import React from 'react'
import '../styles/backdrop.css'

export default function Backdrop({circleSize, lineSize}) {
  return (
    <>

        <div className='bg-circle circle1'></div>
        <div className='bg-circle circle2'></div>
        <div className='bg-circle circle3'></div>
        <div className='bg-circle circle4'></div>

        <div className='tiny-lines line1'></div>
        <div className='tiny-lines line2'></div>
        <div className='tiny-lines line3'></div>
        <div className='tiny-lines line4'></div>

    </>
  )
}
