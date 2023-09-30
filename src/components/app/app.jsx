import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import AppHeader from '../../components/app-header/app-header';
import Login from "../../pages/auth/login/login";
import Registration from "../../pages/auth/registration/registration";
import Home from "../../pages/home/home";
import Profile from "../../pages/profile/profile";
import ProfileForm from "../../pages/profile/profile-form/profile-form";
import { checkUserAuth } from "../../services/user/actions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route path="" element={<OnlyAuth component={<ProfileForm />} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
