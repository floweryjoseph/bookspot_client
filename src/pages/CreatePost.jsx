import { useState } from "react";
import { CameraOffIcon, LoaderIcon } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { useAuthContext } from "../context/AuthContext";
import Rating from '@mui/material/Rating'; 



const CreatePost = () => {


  const form = useForm();
  const {register, handleSubmit, formState} = form;

  const [cover, setCover] = useState(null);
  const [errMsg, setErrMsg] = useState("")
  const [rating, setRating] = useState(0)
   
  const navigate = useNavigate();

  const {user}= useAuthContext()

  const onSubmit = async (data) => {

    console.log(data)
    if(!cover){
      setErrMsg("Please add an image")
      return;
    }
    const formData = new FormData();
    formData.append("file", cover);
    formData.append("upload_preset", "pca6lohi");
    let res;
    try {
      res = await axios.post(
        "https://api.cloudinary.com/v1_1/djyqjmd1o/image/upload/",
        formData
      );
      console.log(res.data);
    
    } catch (err) {
      console.log(err);
    }

    if (res.data) {

     data.cover = res.data.secure_url
     data.rating = rating; 
     console.log(data)

      try {
        const response = await axios.post(
          "http://localhost:5000/user/create-post",data,{
            headers:{
              Authorization: `Bearer ${user.token}` 
            }
            })
      
        console.log(response.data);
        
        navigate("/");
      } catch (err) {
        console.log(err);
       
      }
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
                src={URL.createObjectURL(cover)}
                alt=""
                className="max-h-screen"
              />
            </div>
          )}
        </div>
        <form
          className="space-y-4 md:space-y-6 w-1/3"
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
           
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
              placeholder="Book Name"
              required=""
              
            />
           <p className="text-red-500 text-sm mt-2">{formState.errors.book?.message}</p>
          </div>
          <div>
           
            <input
              {...register("author",{
                required:{
                  value:true,
                message:"Please enter Author"
                },maxLength:{
                  value:100,
                  message:"Must not exceed 100 characters"
  
                }
               })}
              type="text"
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Author Name"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.author?.message}</p>
          </div>
          <div>
            <label
              htmlFor="cover"
              className="block mb-2 top-5 text-sm font-medium text-gray-900 dark:text-white"
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
            {!cover && errMsg && <p className="text-red-500 text-sm mt-2">{errMsg}</p>}
          </div>
          <div>
            {/* <label
              htmlFor="about"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              About
            </label> */}
            <textarea
            {...register("about",{
              required:{
                value:true,
              message:"Please enter Something About Book"
              },maxLength:{
                value:500,
                message:"Must not exceed 500 characters"

              }
             })}
              type="text"
           
              id="about"
              placeholder="About"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.about?.message}</p>
          </div>
          <div>
            {/* <label
              htmlFor="review"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Review
            </label> */}
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
              placeholder="Write a Review"
              className="bg-gray-50 border border-gray-300 h-15 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p className="text-red-500 text-sm mt-2">{formState.errors.review?.message}</p>
          </div>

          <div>
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
         
        </div>

          <button
            type="submit"
            className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
          >
            Create Post
          </button>
        </form>
      </div>
    );
  }


export default CreatePost;



