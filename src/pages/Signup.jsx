import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthContext } from "../context/AuthContext";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const SignUp = () => {

  const navigate = useNavigate();
 const {login} = useAuthContext()
  const form = useForm();
  const { register, handleSubmit, formState, getValues } = form;

  const onSubmit = async (data) => {   
    try {
      const res = await axios.post("https://bookspot-server.onrender.com/auth/register", data);
      console.log(res)
        navigate("/")
  
    } catch (err) {
      console.log(err);
      toast("Signup Failed")
    }
  };

  const handleGoogleLogin = async (data) =>{
    try{
    const res =   await axios.post("https://bookspot-server.onrender.com/auth/google-auth", {credential: data.credential})
    if(res.data){
        login(res.data)
      
    }
  }catch{
    toast("Could not Authenticate with Google")
  }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer/>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create and account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Please enter your username",
                    },
                    minLength: {
                      value: 3,
                      message: "Please enter at least 3 letters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Username must not exceed 30 letters",
                    },
                  })}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-gray-600"
                  id="username"
                  placeholder="Username"
                  required=""
                />
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.username?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter your email",
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="border sm:text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-gray-600"                  placeholder="name@company.com"
                  required=""
                />
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.email?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter your password",
                    },
                    validate: {
                      hasDigit: (value) =>
                        /\d/.test(value) ||
                        "Password must contain at least one digit",
                      hasUppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter",
                      hasLowercase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain at least one lowercase letter",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-gray-600"                  required=""
                />
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.password?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Please enter your password",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="border sm:text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 text-gray-600"                  required=""
                />
                <p className="text-red-500 text-sm mt-2">
                  {formState.errors.confirmPassword?.message}
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 "
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <Link to={"/"}>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <span className="font-medium text-blue-500 hover:underline dark:text-primary-500">
                    Login here
                  </span>
                </p>
              </Link>

            
              <div className="flex gap-4 items-center justify-center ">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(err) => console.log(err)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
