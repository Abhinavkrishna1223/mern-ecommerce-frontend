import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom'
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetCurrOrder } from '../features/orders/OrderSlice';
import { Typography } from '@mui/material';


const OrderSuccessPage = () => {

    const params = useParams();

    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(resetCartAsync());

        dispatch(resetCurrOrder());

    }, [dispatch])

    return (
        <div>
            {!params.id && <Navigate to="/"></Navigate>}
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 h-screen">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                            <div className="">
                                <Typography variant="h6" style={{fontWeight:"bold"}}>
                                    Order Placed Successfully --&gt; ORDER ID:{params?.id}
                                </Typography>
                                <Typography variant='subtitle1' style={{color:"black", margin:"10px 0 2.5rem"}}>Your order is successfullly placed just wait to dispatch from stock and visit to your given address</Typography>
                                <Link to="/" className="sm:w-full lg:w-auto my-5 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"> Go Back to Homepage</Link>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/order-confirmed-7464607-6110040.png?f=webp" alt='img' />
                </div>
            </div>
        </div>
    )
}

export default OrderSuccessPage;
