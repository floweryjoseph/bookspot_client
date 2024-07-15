import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";
import LoadingPage from "./components/LoadingPage";


const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/Signup"));
const LogIn = lazy(() => import("./pages/Login"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const Navbar = lazy(() => import("./components/Navbar"));
const Profile = lazy(() => import("./pages/Profile"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const EditPost = lazy(() => import("./pages/EditPost"));

function App() {
  const { user } = useAuthContext();

  let routes;

  if (!user) {
    routes = (
      <>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LogIn />} />
        </Routes>
      </>
    );
  } else {
    routes = (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:postId" element={<EditPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </>
    );
  }

  return <>
  <Suspense fallback={<LoadingPage/>}>
  {routes}
  </Suspense>
  </>;
}

export default App;
