import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const auth = useSelector((s) => s.auth);
  if (!auth.user) return <Navigate to="/login" replace />;
  if (requireAdmin && auth.user.username !== "satyam" && auth.user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
