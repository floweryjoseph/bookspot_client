import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const data  =JSON.parse(userData)
    if (data) {
      if(data.expiresIn>Date.now()){
        setUser(data)        
      }else{
        logout()
      }
    
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    location.replace("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext  = ()=>{
  return useContext(AuthContext)
}


//export const useAuthContext  = ()=>useContext(AuthContext)
 

