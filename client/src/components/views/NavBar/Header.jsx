import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Link to="/"><h2 className="text-center mb-0 pt-2 pb-2"><img src={'/Images/whosdog_title.png'} style={{"width":"60%","max-height":"200px", "max-width":"600px"}}/></h2></Link>
  )
}

export default Header
