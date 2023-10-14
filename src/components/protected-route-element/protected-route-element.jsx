import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";


export const getUserStore = (store) => store.user;

const ProtectedRouteElement = ({ onlyAuth = true, component }) => {
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
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyAuth={false} component={component} />
);
