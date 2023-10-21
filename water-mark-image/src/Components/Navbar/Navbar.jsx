import React from 'react'
import Logo from '../../assets/iloveimg.svg'
import { AiOutlineMenu } from 'react-icons/ai';
import { FaArrowDown } from 'react-icons/fa'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='navbar'>
    <div className="nav-left">
        <img src={Logo} alt="I love img" />
        <p>All Image Tool  <FaArrowDown style={{fontSize:'16px'}}  /></p>
    </div>
    <div className="nav-right">

    <button className='no-btn-bg'>Login</button>
    <button className='blue-btn-bg'>SignUp</button>
    <AiOutlineMenu style={{ fontSize: '52px', cursor:'pointer' }} />
    </div>
    </div>
  )
}

export default Navbar