import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';
import Rating from '@mui/material/Rating'; 

const Post = ({ blog, i }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [dislikes, setDislikes] = useState(blog.dislikes);
  const { user } = useAuthContext();
  console.log(blog)

  const handleLikePost = async () => {
    const body = {
      postId: blog._id,
    };
    try {
      const res = await axios.post('https://bookspot-server.onrender.com/user/like-post', body, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      console.log(res.data);
      if (res.data) {
        setLikes(res.data.likes);
        setDislikes(res.data.dislikes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislikePost = async () => {
    const body = {
      postId: blog._id,
    };
    try {
      const res = await axios.post('https://bookspot-server.onrender.com/user/dislike-post', body, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      console.log(res);
      if (res.data) {
        setLikes(res.data.likes)
        setDislikes(res.data.dislikes);
      } 
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className={`w-full flex justify-between items-center shadow-md p-10 ${i % 2 !== 0 ? "flex-row-reverse bg-gradient-to-r from-gray-900 to-transparent" : "flex-row bg-gradient-to-r from-transparent to-gray-900"}`}>
      <img src={blog.cover} alt="" className='w-1/4' />
      <div className='w-2/3 flex flex-col gap-5 p-5'>
        <h1 className='text-3xl font-bold uppercase text-orange-500'>{blog.book}</h1>
        <p className='text-2xl font-bold text-orange-400'><span className='font-semibold'>Author: </span> {blog.author}</p>
        <p className='text-xl font-semibold text-orange-600'>{blog.about}</p>
        <p className='text-orange-700'>{blog.review}</p>
        <p className='italic text-orange-400'>posted by: <span className='font-bold capitalize text-white'>{blog.userId?.username}</span></p>

        <div className='flex gap-5 items-center'>
          <Rating
            name="read-only"
            value={blog.rating}
            readOnly
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#ffb400', 
              },
              '& .MuiRating-iconHover': {
                color: '#ffb400', 
              },
              '& .MuiRating-iconEmpty': {
                color: '#ffb400', 
              },
            }}
          />
        </div>

        <div className='flex gap-5 mt-3'>
          <div className='flex items-center gap-2 cursor-pointer'>
            <ThumbsUp className={likes.includes(user.user._id) ? "text-red-500" : ""} onClick={handleLikePost}  />
            <p className='text-sm'>{likes.length}</p>
          </div>
          <div className={`flex items-center gap-2 cursor-pointer mt-2 ${dislikes.includes(user.user._id) ? "text-red-500" : ""}`}>
            <ThumbsDown  onClick={handleDislikePost} />
            <p className='text-sm mb-2'>{dislikes.length}</p>
          </div>
        </div>
      </div>
        </div>
  );
}

export default Post;