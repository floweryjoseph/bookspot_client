import { useEffect, useState } from "react";
import { CameraOffIcon, LoaderIcon } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useAuthContext } from "../context/AuthContext";
import Rating from '@mui/material/Rating'; 
const EditPost = () => {

    const {postId} = useParams()
   
  const form = useForm();
  const {register, handleSubmit, formState, setValue} = form;

  const [cover, setCover] = useState(null);
  const [rating, setRating] = useState(0)
   
  const navigate = useNavigate();

  const {user} = useAuthContext()



const fetchPost = async() => {

    try{
        const res= await axios.get(`https://bookspot-server.onrender.com/user/get-post/${postId}`,{
            headers:{
              Authorization: `Bearer ${user.token}` 
            }
            })
            console.log(res.data.post)
            const post = res.data.post
            setValue("book",post.book);
            setValue("author",post.author);
            setValue("about",post.about);
            setValue("review",post.review);
            setValue("rating",post.rating);
            setCover(post.cover);

    }catch(err){
        console.log(err)
    }

}

 useEffect(()=>{
    fetchPost()
  },[])

  const onSubmit = async (data) => { 
    let res;

    if(typeof  cover !== "string"){

    const formData = new FormData();
    formData.append("file", cover);
    formData.append("upload_preset", "pca6lohi");
    
    try {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/djyqjmd1o/image/upload/",
        formData
      );
      console.log(res.data);
    
    } catch (err) {
      console.log(err);
    }
    }
    
    data.cover = res ?  res.data.secure_url : cover
    data.postId = postId
    data.rating = rating

 console.log(data);
      try {
        const response = await axios.patch("https://bookspot-server.onrender.com/user/update-post",data,{
            headers:{
              Authorization: `Bearer ${user.token}` 
            }
            })
      
        console.log(response.data);
        
         navigate("/");
      } catch (err) {
        console.log(err);
       
      }
    
  };


    return (
      <div className="w-full min-h-screen px-10 flex bg-gray-950 pt-24 text-white">
      {
        formState.isSubmitting &&
        <div className="absolute w-full h-screen flex justify-center items-center top-0 left-0 bg-[#00000050]">
        <LoaderIcon className="h-28 w-28 animate-spin" />
      </div>  
      }
        <div className="w-1/2 flex justify-center items-center pr-10">
          {!cover ? (
            <CameraOffIcon className="h-36 w-36 opacity-25" />
          ) : (
            <div>
              <img
                src={typeof cover === 'string'? cover : URL.createObjectURL(cover)}
                alt=""
                className="max-h-screen"
              />
            </div>
          )}
        </div>
        <form
          className="space-y-4 md:space-y-6 w-1/2"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="book"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book Name
            </label>
            <input
             {...register("book",{
              required:{
                value:true,
              message:"Please enter a book name"
              },maxLength:{
                value:60,
                message:"Must not exceed 60 characters"

              }
             })}
              type="text"
              id="book"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required=""
            />
           <p className="text-red-500 text-sm mt-2">{formState.errors.book?.message}</p>
          </div>
          <div>
            <label
              htmlFor="author"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author
            </label>
            <input
              {...register("author",{
                required:{
                  value:true,
                message:"Please enter Author name"
                },maxLength:{
                  value:200,
                  message:"Must not exceed 200 characters"
  
                }
               })}
              type="text"
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title of your post"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.author?.message}</p>
          </div>
          <div>
            <label
              htmlFor="cover"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cover Page
            </label>
            <input
             onChange = {(e) => setCover(e.target.files[0])}
              type="file"
              accept=".jpg, .png, .jpeg"
              
              id="cover"
              placeholder="image-file"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="about"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label>
            <textarea
            {...register("about",{
              required:{
                value:true,
              message:"Please enter something about book"
              },maxLength:{
                value:500,
                message:"Must not exceed 500 characters"

              }
             })}
              type="text"
           
              id="about"
              placeholder="About Book"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.about?.message}</p>
          </div>
          <div>
            <label
              htmlFor="review"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Review
            </label>
            <textarea
             {...register("review",{
              required:{
                value:true,
              message:"Please enter your review"
              },maxLength:{
                value:1000,
                message:"Must not exceed 1000 characters"

              }
             })}
              type="text"
              name="review"
              id="review"
              placeholder="Enter your review"
              className="bg-gray-50 border border-gray-300 h-28 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.review?.message}</p>
          </div>

          <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Rating
          </label>
          <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
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
         

          <button
            type="submit"
            className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
          >
            Update Post
          </button>
        </form>
      </div>
    );
  }


export default EditPost;
