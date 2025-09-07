import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAdmin({ user, children }) {
  return user && user.accountType === 'admin'
    ? children
    : <Navigate to="/login" replace />;
}