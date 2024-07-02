import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
 
  const {user,logout} = useAuthContext() 

  const [toggleBtn, setToggleBtn] = useState(false)

  return (
    <div className='w-full z-50 h-16 fixed border-b-1 bg-gray-900 top-0 left-0 flex text-gray-200 justify-between items-center px-10'>
      <h1 className='text-2xl text-white cursor-pointer font-extrabold'>Book<span className='text-red-600'>Spot</span></h1>
      
        <ul className='flex gap-5 items-center '>
          <Link to={"/"} className='hover:text-orange-600'>Home</Link>
          <Link to={"/create-post"} className='hover:text-orange-600'>Create Post</Link>
          <Link to={"/profile"} className='hover:text-orange-600'>My Posts</Link>
          </ul>

          <div className='relative'>
            <div id="dropdown" className="z-10 relative  bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
              <button onClick={() => setToggleBtn(!toggleBtn)} className="text-white bg-orange-900 hover:bg-orange-950 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center" type="button">{user?.user?.username}</button>
              <ul hidden={toggleBtn} className="py-2 text-sm text-gray-700 dark:text-gray-200 absolute top-12" aria-labelledby="dropdownDefaultButton">
               <li className='bg-gray-700 w-full font-bold cursor-pointer' onClick={logout}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
       
      
    </div>
  )
}

export default Navbar
