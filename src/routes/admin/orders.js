import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const List = lazy(() => import('../../container/orders/list'));
const Create = lazy(() => import('../../container/orders/create'));

function OrderRoutes() {
  return (
    <Routes>
      <Route index path="/list" element={<List />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default OrderRoutes;
