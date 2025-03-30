import "./styles.css";
// import './App.css'
import { Routes, Route } from 'react-router-dom';

import HomePage from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
// import Premimum from "./routes/Premimum";
import ProfilePage from "./routes/Profile";
import UserRegister from "./Pages/User-profile/Authontication-page/Userregister";
import UserLoginPage from "./Pages/User-profile/Authontication-page/Userlogin";

import AdminSignUp from './Pages/Admin-profile/Authontication-page/Adminregister'
import AdminMainPage from "./Pages/Admin-profile/MainPage";
import AdminLoginPage from "./Pages/Admin-profile/Authontication-page/Adminlogin";
// import LandingPage from "./landing-page/Landing-page";
import Error from "./routes/Error";

import Addrecipes from './Pages/User-profile/pages/Add-recipes'
import Changepas from './Pages/User-profile/pages/Change-pas'
import Language from './Pages/User-profile/pages/Language'
import Managerev from './Pages/User-profile/pages/Manage-rev'
import Profilesetg from './Pages/User-profile/pages/Profile-setg'
import Saveditems from './Pages/User-profile/pages/Saved-items'
import Profile from "./Pages/User-profile/pages/Profile";

import VegItem from "./Pages/Recipes/VegItem/VegItem";
import MainPage from "./Pages/Recipes/MainPage";
import Rainny from './Pages/Recipes/ByMealSeason/Rainny'
import Winter from './Pages/Recipes/ByMealSeason/Winter'
import Summer from './Pages/Recipes/ByMealSeason/Summer'
import Breakfast from "./Pages/Recipes/ByMealType/Breakfast";
import Lunch from "./Pages/Recipes/ByMealType/Lunch";
import Dinner from "./Pages/Recipes/ByMealType/Dinner";
import Sancks from "./Pages/Recipes/ByMealType/Sancks";

/* ----------------------------------------------------------- */
import HomeComponent from "./Pages/Admin-profile/Pages/Home";
import Team from "./Pages/Admin-profile/Pages/Team";
import Feedback from "./Pages/Admin-profile/Pages/Feedback";
import Documents from "./Pages/Admin-profile/Pages/Documents";
import Projects from "./Pages/Admin-profile/Pages/Notification";
import ViewAllRecipes from "./Pages/Recipes/ViewAllRecipes";
import Loadedrecipe from "./Pages/Recipes/loadedrecipe";
import SingleView from "./Pages/Admin-profile/Pages/SingleView";
import LoadedRecipe from "./Pages/Recipes/loadedrecipe";
import LoadedRecipes from "./Pages/Recipes/Displayloadedrecipe";
import AddNewPassword from "./Pages/User-profile/ForgotPassword/AddNewPassword";
import EditRecipe from "./Pages/Admin-profile/Pages/EditFile";

import { ToastContainer } from 'react-toastify';
import Updaterecipe from "./Pages/Admin-profile/Pages/Updaterecipe";
import FAQs from "./components/FAQs";

export default function App() {
  return (
    <div className="App">
      
      <Routes>
        
        <Route path="/" element={<HomePage/>} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/shop" element={<Service/>} />
        <Route path="/FAQs" element={<FAQs/>} />
        <Route path="/pass" element={<AddNewPassword/>} />
        
        <Route path="/profile" element={<ProfilePage/>} />

        {/* user login */}
        <Route path="/usersignup" element={<UserRegister/>} />
        <Route path="/userlogin" element={<UserLoginPage/>} />

        <Route path="/singleview" element={<SingleView/>} />
        
        {/* Admin */}
        <Route path="/adminlogin" element={<AdminLoginPage/>} />
        <Route path="/adminreg" element={<AdminSignUp/>} />

        {/* admin profile */}
        <Route path="/adminProfile" element={<AdminMainPage/>} />
        
        <Route path="/user-profile" element={<Profile/>} />
        <Route path="/add-recipes" element={<Addrecipes/>} />
        <Route path="/change-password" element={<Changepas/>} />
        <Route path="/language" element={<Language/>} />
        <Route path="/manage-review" element={<Managerev/>} />
        <Route path="/profile-setting" element={<Profilesetg/>} />
        <Route path="/saved-items" element={<Saveditems/>} />

        {/* <Route path="/adminProfile" element={<adminProfile/>} /> */}

        <Route path="/*" element={<Error/>} />

        {/* Recipes Pages  */}
        <Route path="/allrecipe/vegitem" element={<VegItem/>} />
        <Route path="/allrecipe" element={<MainPage/>} />
        <Route path="/allrecipe/viewallrecipe" element={<ViewAllRecipes/>} />

        {/* RecipesItemsPage */}
        <Route path="/allrecipe/summer" element={<Summer/>} />
        <Route path="/allrecipe/rainny" element={<Rainny/>} />
        <Route path="/allrecipe/winter" element={<Winter/>} />

        <Route path="/allrecipe/breakfast" element={<Breakfast/>} />
        <Route path="/allrecipe/lunch" element={<Lunch/>} />
        <Route path="/allrecipe/dinner" element={<Dinner/>} />
        <Route path="/allrecipe/snacks" element={<Sancks/>} />

        <Route path="/loadedrecipe" element={<LoadedRecipe/>} />
        {/* <Route path="/:recipeName" element={<LoadedRecipes/>} /> */}
        
        {/* -------------------------------------------------- */}  
        {/* <Route exact path="/adminProfile" element={<HomeComponent />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/feedbacks" element={<Feedback />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/notification" element={<Projects />} /> 
        <Route path="/updaterecipe/:id" element={<Updaterecipe />} /> 

      </Routes>
      <ToastContainer position="top-center"
       autoClose={2000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      />
    </div>  
  );
}
