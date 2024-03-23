import { useEffect, useState } from "react";
import { getToken, saveAuthData } from "../store/authStore";
import Dashboard from "../components/Dashboard";
import LoginForm from "../components/LoginForm";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLoginSuccess = (auth) => {
    saveAuthData(auth);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <LoginForm onLoginSuccess={onLoginSuccess} />
  );
};

export default HomePage;
