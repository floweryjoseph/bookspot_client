import pageNotfound from '../assets/pageNotFound.png'

const PageNotFound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-800'>
        <img src={pageNotfound} className='h-1/2 opacity-40' alt="" />
    </div>
  )
}

export default PageNotFound