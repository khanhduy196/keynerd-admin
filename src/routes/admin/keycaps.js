import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Keycaps = lazy(() => import('../../container/keycaps/list'));
const CreateKeycap = lazy(() => import('../../container/keycaps/create'));
const ViewKeycap = lazy(() => import('../../container/keycaps/view'));
const UpdateKeycap = lazy(() => import('../../container/keycaps/update'));

function KeycapRoutes() {
  return (
    <Routes>
      <Route index path="/list" element={<Keycaps />} />
      <Route path="/create" element={<CreateKeycap />} />
      <Route path="/view/:id" element={<ViewKeycap />} />
      <Route path="/update/:id" element={<UpdateKeycap />} />
    </Routes>
  );
}

export default KeycapRoutes;
