import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


export const getUserStore = (store: any) => store.user;
interface IProtectedRouteElement {
  onlyAuth?: boolean;
  component: React.ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRouteElement> = ({ onlyAuth = true, component }) => {
  const { loadUser, user } = useSelector(getUserStore);
  const location = useLocation();

  if (loadUser.isRequest) {
    return null;
  }

  if (!onlyAuth && user.data) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !user.data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth: FC<IProtectedRouteElement> = ({ component }) => (
  <ProtectedRouteElement onlyAuth={false} component={component} />
);
