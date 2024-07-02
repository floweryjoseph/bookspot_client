import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import banner from "../assets/books/banner.jpg"

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const { user } = useAuthContext();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/get-posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res.data);
      setBlogs(res.data.posts.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-950 flex flex-col gap-10 items-center px-12 pt-24 text-white">
      <div className="w-[90%] flex justify-center relative">
        <img  className = "w-full h-[500px] opacity-40" src ={banner} alt=""/>
        <h1 className="w-[70%] text-center absolute top-40 text-5xl font-semibold text-white">Turning pages, sharing opinions. Dive deep into the world of books.</h1>
      </div>
      <div className="w-[90%] flex flex-col gap-6 items-center ">
        {blogs.map((blog, i) => (
          <Post key={i} blog={blog} i={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
