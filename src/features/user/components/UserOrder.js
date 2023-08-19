import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  fetchLoggedUserOrdersAsync, selectUserInfo } from '../userSlice';
import { getOrderAsync, selectOrders } from '../../orders/OrderSlice';

function UserOrder() {
    const user = useSelector(selectUserInfo);
    console.log(user, "UserOrder may Info");
    const userOrders = useSelector(selectOrders);
    console.log(userOrders, "userOrders");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderAsync())
    }, [dispatch])
    return (
        <div>
            {userOrders.map((order) => {
                return (<>
                    <div className=' mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
                        <h1 className='flex justify-between font-bold text-center text-[2rem] border-2 mt-4 border-zinc-950 bg-cyan-300'>Odered Items  </h1>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {order.product.map((item, index) => (
                                        <li key={index} className="flex py-6">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.product.thumbnail}
                                                    alt={item.product.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.title}>{item.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${item.product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {item.quantity}
                                                    </p>
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
                                <p>${order.totalAmount} <br />Total Items: {order.totalQuantity}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping Address</p>
                        </div>
                    </div>
                </>)
            })}
        </div>
    )
}

export default UserOrder;