import React from 'react'
import {Link} from 'react-router-dom'

export const NavBarSimple = () => {
  return (
    <div className="bg-warning">
        <Link to="/"><h1 className="text-center mb-0 pt-1 pb-3 font-white">Whos Dog</h1></Link>  
    </div>
  )
}
