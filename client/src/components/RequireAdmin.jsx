import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  if (user.accountType !== "admin") return <Navigate to="/" replace />;
  return children;
}