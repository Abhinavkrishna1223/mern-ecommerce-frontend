import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCount,
} from './OrderSlice';

export function Order() {
  const orders = useSelector((state)=> state.order.orders);
  console.log(orders);
  const dispatch = useDispatch();


  return (
    <div>
    
    </div>
  );
}
