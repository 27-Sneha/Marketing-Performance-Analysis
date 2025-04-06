import { useState, createContext } from "react";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { facebookApi, loginApi, logoutApi, registerApi } from "../api/apiCalls";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");

  const facebookLogin = async (data) => {
    try {
      const response = await facebookApi(data);
      setJwtToken(response.token);
      setUser(response.user);
      return response;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await loginApi(email, password);
      setJwtToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const register = async (name, email, password, cnf_password) => {
    try {
      const data = await registerApi(name, email, password, cnf_password);
      setJwtToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const logout = async () => {
    try {
      const data = await logoutApi(jwtToken);
      setJwtToken(null);
      setUser(null);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        jwtToken,
        setJwtToken,
        facebookLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
