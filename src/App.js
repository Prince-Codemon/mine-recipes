import "./App.css";
import { Routes, Route  } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import CreateBlog from "./pages/CreateRecipe";
import NFPage from "./pages/NFPage";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import {Toaster} from 'react-hot-toast'

import { NotLogin, User } from "./Routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUserQuery } from "./store/services/userService";
import { logout } from "./store/slice/userSlice";
import VerifyEmail from "./pages/VerifyEmail";
import UserProfile from "./pages/UserProfile";
import ForgortPage from "./pages/ForgotPage";
import RHelmet from "./components/Helmet";
import Sitemap from "./Sitemap";
import Faq from "./pages/Faq";
import Recipes from "./pages/Recipes";
import Recipe from "./pages/Recipe";
import EditRecipe from "./pages/EditRecipe";
import SavedRecipes from "./pages/SavedRecipes";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [getuser, result] = useLazyGetUserQuery();
  
  useEffect(() => {
    if (user) {
      getuser(user);
    }
  }, [user, getuser]);
  useEffect(() => {
    if(result?.error?.status === 400){
      dispatch(logout())
    }
  }, [result, dispatch]);

  return (
    <>
      <RHelmet title="Home" />
      <Navbar />
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Recipes />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/recipe/:id" pr element={<Recipe />} />
        <Route path="/user/:id" element={<UserProfile />} />
        {/* auth routes */}
        <Route path="/auth">
          <Route
            path="login"
            element={
              <NotLogin>
                <Login />
              </NotLogin>
            }
          />
          <Route
            path="signup"
            element={
              <NotLogin>
                <SignUp />
              </NotLogin>
            }
          />
          <Route
            path="forgotpassword"
            element={
              <NotLogin>
                <ForgotPassword />
              </NotLogin>
            }
          />
          <Route
            path="reset-password/:token"
            element={
              <NotLogin>
                <ForgortPage />
              </NotLogin>
            }
          />
          <Route path="verify-email/:id" element={<VerifyEmail />} />
          <Route element={<NFPage />} />
        </Route>
        {/* user routes */}
        <Route path="/user">
          <Route
            path="profile"
            element={
              <User>
                <Profile />{" "}
              </User>
            }
          />
          <Route
            path="editprofile"
            element={
              <User>
                <EditProfile />{" "}
              </User>
            }
          />
          <Route
            path="createrecipe"
            element={
              <User>
                <CreateBlog />
              </User>
            }
          />
          <Route
            path="savedrecipes"
            element={
              <User>
                <SavedRecipes />
              </User>
            }
          />
          <Route
            path="editrecipe/:id"
            element={
              <User>
                <EditRecipe />
              </User>
            }
          />
          <Route path="*" element={<NFPage />} />
        </Route>
       
        {/* sitemap */}
        <Route path="/sitemap" element={<Sitemap />} />
        {/* not found page */}

        <Route path="*" element={<NFPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
