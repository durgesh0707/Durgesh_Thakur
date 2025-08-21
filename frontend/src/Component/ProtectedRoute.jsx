// Component/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import { toast } from "react-toastify";

let toastShown = false;

function ProtectedRoute({ children, adminOnly = false }) {
  const { userData, loading } = useContext(userDataContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!userData) {
    if (!toastShown) {
      toast.error("Please log in to continue");
      toastShown = true;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin-only route, but user is not admin
  if (adminOnly && !userData.isAdmin) {
    if (!toastShown) {
      toast.error("Access Denied: Admins only");
      toastShown = true;
    }
    return <Navigate to="/" replace />;
  }

  toastShown = false; // Reset after successful access
  return children;
}

export const PrivateRoute = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export const AdminRoute = ({ children }) => (
  <ProtectedRoute adminOnly>{children}</ProtectedRoute>
);
