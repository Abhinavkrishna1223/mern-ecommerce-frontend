// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectOrders } from './OrderSlice';



// export function Order() {

//  const orders = useSelector(selectOrders)

//   return (
//     <>
//       <div className="lg:col-span-2">
//         <div className=' mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
//           <h1 className='flex justify-between font-bold text-center text-[2rem] border-2 mt-4 border-zinc-950 bg-cyan-300'>Cart <ShoppingCartIcon className="h-10 w-10" aria-hidden="true" /> </h1>
//           <div className="mt-8">
//             <div className="flow-root">
//               <ul role="list" className="-my-6 divide-y divide-gray-200">
//                 {orders.map((item, index) => (
//                   <li key={index} className="flex py-6">
//                     <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                       <img
//                         src={item.product.thumbnail}
//                         alt={item.product.title}
//                         className="h-full w-full object-cover object-center"
//                       />
//                     </div>

//                     <div className="ml-4 flex flex-1 flex-col">
//                       <div>
//                         <div className="flex justify-between text-base font-medium text-gray-900">
//                           <h3>
//                             <a href={item.product.href}>{item.product.title}</a>
//                           </h3>
//                           <p className="ml-4">{item.product.price}</p>
//                         </div>
//                         <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
//                       </div>
//                       <div className="flex flex-1 items-end justify-between text-sm">
//                         <p className="text-gray-500">Qty

//                           <select className='ml-[10px]' onChange={(e) => handleQntyChange(e, item)} value={item.quantity} >
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                           </select>

//                         </p>

//                         <div className="flex">
//                           <button
//                             onClick={() => handleRemove(item.id)}
//                             type="button"
//                             className="font-medium text-indigo-600 hover:text-indigo-500"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>



//           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//             <div className="flex justify-between text-base font-medium text-gray-900">
//               <p>Subtotal</p>
//               <p>${totalAmount} <br /> Total Items: {totalQuantity}</p>

//             </div>
//             <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
//             <div className="mt-6">
//               <button
//                 onClick={handleOrder}
//                 className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//               >
//                 Pay and Order
//               </button>
//             </div>
//             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//               <p>
//                 or
//                 <Link to='/'>
//                   <button
//                     type="button"
//                     className="font-medium text-indigo-600 hover:text-indigo-500"
//                     onClick={() => setOpen(false)}
//                   >
//                     Continue Shopping
//                     <span aria-hidden="true"> &rarr;</span>
//                   </button>
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
