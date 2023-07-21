import React, { useEffect } from 'react';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/Protected';
import { getUserAsync } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage />

    ),
  },
  {
    path: "/signup",
    element: (
      <SignupPage />
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <Protected>
        <ProductDetailsPage />
      </Protected>
    ),
  },
]);


function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUserAsync())
},[dispatch])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
