import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className='Tilt br2 shadow-2' options={{ max: 50 }} style={{ height: '150px', width: '150px'}}>
        <div className="pa4" style={{height: '150px', width: '150px'}}>
          <img alt="Logo of a brain with circuits" src={brain}></img>
        </div>
      </Tilt>
    </div>
  )
}

export default Logo;