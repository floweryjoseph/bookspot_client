import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthContext();

  const [toggleBtn, setToggleBtn] = useState(false);

  return (
    <div className='w-full z-50 h-16 fixed border-b-1 bg-gray-900 top-0 left-0 flex text-gray-200 justify-between items-center px-10'>
      <h1 className='text-2xl text-white cursor-pointer font-extrabold'>
        Book<span className='text-orange-700'>Spot</span>
      </h1>

      <ul className='hidden md:flex space-x-5 items-center'>
        <Link to="/" className='hover:text-orange-600'>Home</Link>
        <Link to="/create-post" className='hover:text-orange-600'>Create Post</Link>
        <Link to="/profile" className='hover:text-orange-600'>My Posts</Link>
      </ul>

      <div className='md:hidden'>
        <button onClick={() => setToggleBtn(!toggleBtn)} className="text-white bg-orange-900 hover:bg-orange-950 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center" type="button">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {toggleBtn && (
        <div className='md:hidden absolute top-16 right-0 w-full bg-gray-700'>
          <ul className='flex flex-col items-center space-y-5 py-2'>
            <Link to="/" className='hover:text-orange-600' onClick={() => setToggleBtn(false)}>Home</Link>
            <Link to="/create-post" className='hover:text-orange-600' onClick={() => setToggleBtn(false)}>Create Post</Link>
            <Link to="/profile" className='hover:text-orange-600' onClick={() => setToggleBtn(false)}>My Posts</Link>
            <li className='w-full font-bold cursor-pointer text-center' onClick={() => { logout(); setToggleBtn(false); }}>
              Logout
            </li>
          </ul>
        </div>
      )}

      <div className='hidden md:flex relative'>
        <button onClick={() => setToggleBtn(!toggleBtn)} className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center" type="button">
          {user?.user?.username}
        </button>
        {toggleBtn && (
          <ul className='absolute top-16 right-0 py-2 text-sm text-gray-700 dark:text-gray-200 bg-gray-700 w-full rounded-lg shadow divide-y divide-gray-100'>
            <li className='w-full font-bold cursor-pointer text-center' onClick={logout}>
              Logout
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
