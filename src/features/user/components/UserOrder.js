import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../userSlice';
import { getOrderAsync, selectOrders } from '../../orders/OrderSlice';
import {IoMdCash} from 'react-icons/io'
import {AiFillCreditCard} from 'react-icons/ai'

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
                        <h1 className=' flex justify-center font-bold text-black my-4 text-2xl bg-yellow-400'>Order ID &nbsp; : &nbsp; <h1 className=' text-green-500'>{order.id}</h1> </h1>
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
                            <p className="mt-0.5 text-sm text-black font-bold ">Shipping Address</p>

                            {/* card-1 */}
                            {order.selectedAddress.map((adrs) => {
                                return (
                                    <div className=" w-full lg:max-w-full lg:flex my-[25px]">
                                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Xb-IQGY3AY3zA7i1CjKsXg53Eyn4ls2IGHrm9vQi_fhdG8BHBNyrJOXQ9zISGL0W8No&usqp=CAU' className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" alt='user' />
                                        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                            <div className="mb-8">
                                                <div className="text-gray-900 font-bold text-xl mb-2">{adrs.city}, {adrs.state}</div>
                                                <p className="text-gray-700 text-base">{adrs.streetAddress}, {adrs.postalCode}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <img className="w-10 h-10 rounded-full mr-4" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="email" />
                                                <div className="text-sm">
                                                    <p className="text-blue-900 leading-none">{adrs.email}</p>
                                                    <p className="text-gray-900 leading-none">{adrs.name}</p>
                                                    <p className="text-gray-600">{adrs.phone}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <p className="mt-0.5 text-sm text-black font-bold flex ">Mode of Payment : {order.paymentMethod==='cash'?(<IoMdCash className=' fill-green-600 mt-[6px] mx-1'/> ):(<AiFillCreditCard className=' fill-yellow-400 mt-[6px] mx-1'/>)} </p>


                        </div>
                    </div>
                </>)
            })}
        </div >
    )
}

export default UserOrder;