import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const token = sessionStorage.getItem("authToken");

  const user = JSON.parse(
    sessionStorage.getItem("loggedInUser")
  );

  // Login केलेला नसेल
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // User असेल तर Admin page ला जाऊ देऊ नका
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Admin असेल तर page दाखवा
  return <Outlet />;
}

export default AdminRoute;