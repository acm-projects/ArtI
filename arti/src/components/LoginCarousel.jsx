/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react'
import { Carousel } from 'react-bootstrap'

export default function LoginCarousel() {
  return (
    <Carousel fade controls={false} indicators={false} interval={5000}>
      <Carousel.Item>
        <img
          src='images/girl.png'
          alt='Girl Portrait from an AI Image Generator'
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='images/loginPage-image.png'
          alt='Girl Portrait from an AI Image Generator'
        />
      </Carousel.Item>
    </Carousel>
  )
}
