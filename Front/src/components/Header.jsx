import React from 'react'
import Logo from '../images/logomen.png'

function Header() {
  return (
    <div className='d-flex justify-content-center'>
        <img src={Logo} alt='LogoMengov'/>
    </div>
  )
}

export default Header