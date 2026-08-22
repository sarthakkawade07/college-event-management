import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token = sessionStorage.getItem("authToken");
  const user = JSON.parse(
    sessionStorage.getItem("loggedInUser")
  );

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;