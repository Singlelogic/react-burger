import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import AppHeader from "../../components/app-header/app-header";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import OrderDetail from "../../components/order-list/order-detail/order-detail";
import ForgotPassword from "../../pages/auth/forgot-password/forgot-password";
import Login from "../../pages/auth/login/login";
import Registration from "../../pages/auth/registration/registration";
import ResetPassword from "../../pages/auth/reset-password/reset-password";
import OrderFeed from "../../pages/order-feed/order-feed";
import Home from "../../pages/home/home";
import NotFound404 from "../../pages/not-found/not-found";
import Profile from "../../pages/profile/profile";
import ProfileForm from "../../pages/profile/profile-form/profile-form";
import OrderHistory from "../../pages/profile/order-history/order-history";
import { getIngredients } from "../../services/burger-ingredients/actions";
import { useDispatch } from "../../services/store";
import { checkUserAuth } from "../../services/user/actions";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/feed" element={<OrderFeed />} />
        <Route path="/feed/:id" element={<OrderDetail />} />
        <Route path="/profile" element={<OnlyAuth component={<Profile />} />} >
          <Route path="" element={<OnlyAuth component={<ProfileForm />} />} />
          <Route path="orders" element={<OnlyAuth component={<OrderHistory />} />} />
        </Route>
        <Route path="profile/orders/:id" element={<OnlyAuth component={<OrderDetail />} />} />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </>
  )
}

export default App;
