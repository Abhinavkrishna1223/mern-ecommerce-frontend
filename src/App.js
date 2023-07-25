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
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './pages/404Page';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { getOrderAsync } from './features/orders/OrderSlice';
import { fetchCartByUserIdAsync } from './features/cart/cartSlice';




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
  {
    path: "*",
    element: (
     <PageNotFound/>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage />
      </Protected>
    ),
  },
]);


function App() {
  
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.logUser);
  console.log(user, "user");
  // console.log(user.id,"Id-user");
  

  useEffect(()=>{

    // dispatch(getUserAsync())
    dispatch(getOrderAsync())
},[dispatch])

if(user && user.id){
  console.log(user.id, "user Id");
}

useEffect(()=>{
  if(user){
    dispatch(fetchCartByUserIdAsync(user.id))
  }
  
})

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
