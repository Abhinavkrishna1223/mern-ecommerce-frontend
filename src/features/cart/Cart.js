import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {deleteCartAsync, updateCartAsync } from './cartSlice';





export function Cart() {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const cartProduct = useSelector((state)=>state?.cart.items);

  const handleQntyChange =(e, item)=>{
    dispatch(updateCartAsync({...item, quantity:+e.target.value}));
  }

  const handleRemove=(id)=>{
    dispatch(deleteCartAsync(id))
  }




  const totalAmount = cartProduct.reduce((amnt, items)=> items.price*items.quantity + amnt,0);
  const totalQuantity = cartProduct.reduce((qty, items)=>items.quantity + qty,0)
  

  return (
    <div className=' mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
      <h1 className= 'flex justify-between font-bold text-center text-[2rem] border-2 mt-4 border-zinc-950 bg-cyan-300'>Cart <ShoppingCartIcon className="h-10 w-10" aria-hidden="true"/> </h1>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cartProduct.map((item) => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={item.title}>{item.title}</a>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {console.log(item.id)}

                    <select className='ml-[10px]' onChange={(e)=>handleQntyChange(e,item)} value={item.quantity} >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>                    
                    </select>

                     </p>

                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={()=>handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>



      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${totalAmount} <br />Total Items: {totalQuantity}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div className="mt-6">
          <Link
           to='/checkout'
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to='/'>
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => setOpen(false)}
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
