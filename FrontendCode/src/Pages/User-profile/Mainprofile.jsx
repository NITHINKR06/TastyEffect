import React from 'react'
import Dashboard from './userbaseproflie'
import Profile from './pages/Profile'
import ProfilePage from '../../routes/Profile';

export default function Mainprofile() {

  const [token, setToken] = useState(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/profile");
    } else {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#FFDEE9',
    backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',}}>
      {token ? <Profile/> : <ProfilePage/>}

    </div>
  )
}
