import  { useEffect, useState } from 'react'
import {ChevronDown, Edit, ThumbsDown, ThumbsUp, Trash } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

const Profile = () => {

    const [collapsedPost,setCollapsedPost]=useState(null)
    const [blogs, setBlogs] = useState([])
   
    const {user} = useAuthContext()
       const fetchBlogs = async () => {
        try{
          const res  = await axios.get(`https://bookspot-server.onrender.com/user/get-posts/${user.user._id}`,{
            headers:{
              Authorization: `Bearer ${user.token}` 
            }
            })
          console.log(res.data)
          setBlogs(res.data.posts)
        }catch(err){
          console.log(err)
        }
      }



      const deletePost = async (id) => {
        try{
          const res  = await axios.delete(`https://bookspot-server.onrender.com/user/delete-post/${id}`,{
            headers:{
              Authorization: `Bearer ${user.token}` 
            }
            })
          console.log(res.data)
          fetchBlogs();
        }catch(err){
          console.log(err)
        }
      }
    
      useEffect(() =>{
        fetchBlogs()
      },[])
    

    
    return (
        <div className='w-full min-h-screen bg-gray-950 px-4 md:px-10 pt-20 text-white'>
            <div className='w-full bg-gray-800 my-5  text-orange-600 h-28 flex flex-col items-center justify-evenly'>
                <h1 className='text-3xl font-bold'>{user.user.username}</h1>
                <p className='text-lg'><span className='text-xl font-bold mr-2'>{blogs.length}</span> {blogs.length ===1 ? 'Post':'Posts'}</p>
            </div>
            <div className='w-full flex flex-col gap-5 items-center '>
                {blogs.map((blog, i) => (
                    <div key={i} className={`relative w-full flex flex-col justify-between items-center gap-10 border-2 bg-gray-800/40 border-black/30 shadow-md p-10 ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                        <img src={blog.cover} alt="" className='w-full md:w-1/5' />
                        <div className='w-full md:w-2/3 flex flex-col gap-5 md:p-10'>
                            <ChevronDown onClick={()=>setCollapsedPost(collapsedPost ===i ? null : i)} className={`cursor-pointer md:h-10 md:w-10 h-7 w-7 absolute right-5 md:top-5 ${i % 2 === 0 ? "md:right-5" : "md:left-5"} ${collapsedPost === i && "rotate-180"}`}/>
                            <h1 className='text-lg md:text-3xl font-bold uppercase text-orange-500'>{blog.book}</h1>
                            <p className='text-lg md:text-2xl font-bold text-orange-400'><span className='font-semibold'>Author: </span> {blog.author}</p>
                            <p hidden={collapsedPost !==i} className='text-md md:text-xl font-thin text-justify text-orange-300'>{blog.about}</p>
                            <p hidden={collapsedPost !==i}>{blog.content}</p>
                            <p className='italic text-orange-700'>posted by : <span className='font-bold capitalize'>{user.user.username}</span></p>
                                <div className='flex gap-5'>
                                <div className='flex items-center gap-2'>
                                    <ThumbsUp />
                                    <p className='text-sm'>{blog.likes.length}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <ThumbsDown className='mt-2' />
                                    <p className='text-sm'>{blog.dislikes.length}</p>
                                </div>
                            </div>
                            <div className='flex gap-5 '>
                              <Link to={`/edit-post/${blog._id}`}>
                                <button type="submit" className="w-fit py-1 md:py-2 px-5 flex items-center justify-center gap-2 text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm  text-center"><Edit/> Edit Post</button>
                                </Link>
                                <button onClick={()=>deletePost(blog._id)} type="submit" className="md:w-fit px-4 md:px-10 py-1 md:py-2 flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><Trash/> Delete Post</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Profile
