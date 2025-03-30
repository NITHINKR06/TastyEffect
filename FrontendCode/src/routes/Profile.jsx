import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../Pages/User-profile/pages/Profile';
import AdminLoginPage from '../Pages/Admin-profile/Authontication-page/Adminlogin';
import UserSignUp from '../Pages/User-profile/Authontication-page/Userregister';

export default function ProfilePage() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/user-profile"); // Redirect to user profile page if token is not found
    } else {
      navigate('/profile')
    }
    setIsLoading(false); // Mark loading as false once the token check is done
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // You might want to show a loader while checking the token
  }

  return (
    <>
      {token ? <Profile /> : <UserSignUp />}
    </>
  );
}
