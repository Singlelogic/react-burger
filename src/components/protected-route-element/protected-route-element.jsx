import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


const getUserStore = (store) => store.user;

const ProtectedRouteElement = ({ onlyAuth = true, component }) => {
  const { user, isUserRequest } = useSelector(getUserStore);
  const location = useLocation();

  if (isUserRequest) {
    return null;
  }

  if (!onlyAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (onlyAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyAuth={false} component={component} />
);
