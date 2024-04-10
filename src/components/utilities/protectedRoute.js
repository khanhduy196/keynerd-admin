import propTypes from 'prop-types';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ Component, path }) {
  const isLoggedIn = true;

  return isLoggedIn ? (
    <Routes>
      {' '}
      <Route element={<Component />} path={path} />{' '}
    </Routes>
  ) : (
    <Routes>
      {' '}
      <Route path="/hexadash-react/admin" element={<Navigate to="/" />} />
    </Routes>
  );
}

ProtectedRoute.propTypes = {
  Component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};

export default ProtectedRoute;
