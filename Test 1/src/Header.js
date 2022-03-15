import React from 'react'
import "./Header.css"
import glass from './assets/glass.jpg'
import bigM from './assets/M-M.png'

function Header() {
  return (
    <>
    <div className='header'>
      <img className='logo' src={bigM} />
      <h2>Maybe not Maybelline</h2>
    </div>
    <img className='banner' src={glass} />
    </>
  )
}

export default Header