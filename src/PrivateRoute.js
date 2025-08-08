import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const hasValidRole = !!user && ["admin", "manager", "leader", "developer"].includes(user.role);

  if (!isAuthenticated || !hasValidRole) {
    try {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    } catch (e) {}
    return <Navigate to="/" replace />;
  }
  return children;
}
