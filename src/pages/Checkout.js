import { Fragment, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartAsync, updateCartAsync } from '../features/cart/cartSlice';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userDetailsAsync } from '../features/auth/authSlice';
import { createOrderAsync } from '../features/orders/OrderSlice';





const imgAdres = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

function Checkout() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.logUser);

   
    const currentOrder = useSelector((state) => state.order.currentOrder);
    console.log(currentOrder, 'oredr');

    console.log(user, 'pop');

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [paymentMethod, setPaymentMethod] = useState("cash");

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value]);
        console.log(selectedAddress, "selectedAddress");
        
    }

    const handlePayment = (e) => {
        console.log(e.target.value, 'wiuushd');
        setPaymentMethod(e.target.value)
    }



    const userSchema = yup.object({
        name: yup.string().required('Name is required').min(3, 'Minimum letters should be 3'),
        email: yup.string().email('Invalid Email Format').required('Email is required'),
        phone: yup.string().required('Phone Number is required'),
        streetAddress: yup.string().required('Mandatory field'),
        city: yup.string().required('Mandatory field'),
        state: yup.string().required('Mandatory field'),
        postalCode: yup.string().required('Mandatory field')
    })


    const {
        register,
        handleSubmit,
        reset,
        formState
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            streetAddress: "",
            city: "",
            state: "",
            postalCode: ""
        },
        resolver: yupResolver(userSchema)
    })

    const { errors } = formState;

    const onSubmit = (data) => {


        dispatch(userDetailsAsync({ id:user?.id, addresses:data }));

        reset();
    }

    const cartProducts = useSelector((state) => state.cart.items)
    
    const handleQntyChange =(e, item)=>{
        dispatch(updateCartAsync({id:item.id, quantity:+e.target.value}));
      }


    const handleRemove = (id) => {
        dispatch(deleteCartAsync(id))
    }

    const totalAmount = cartProducts.reduce((amnt, items)=> (items.product.price)*(items.quantity) + amnt,0);
    const totalQuantity = cartProducts.reduce((qty, items)=>items.quantity + qty,0);

    const handleOrder = () => {

        const order = { user, cartProducts, totalAmount, totalQuantity, paymentMethod, selectedAddress }

        dispatch(createOrderAsync(order))

        //TODO: redirect to order success page //
        //TODO: clear cart after order //
        //TODO: change in stock value of items whem items get purchased //
    }

    const [open, setOpen] = useState(true)
    return (

        <>
            {!cartProducts.length && <Navigate to="/"></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <form className='bg-white  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-[1.5rem] py-6' noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('name')}
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.name?.message}</p>
                                </div>


                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            {...register('email')}
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.email?.message}</p>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phone"
                                            {...register('phone')}
                                            type="tel"
                                            autoComplete="phone"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>

                                    <p className=' text-red-600'>{errors?.country?.message}</p>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('streetAddress')}
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.streetAddress?.message}</p>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('city')}
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.city?.message}</p>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('state')}
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.state?.message}</p>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            {...register('postalCode')}
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    <p className=' text-red-600'>{errors?.postalCode?.message}</p>
                                </div>


                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Choose from existing address
                            </p>

                            <ul role="list" className="divide-y divide-gray-100">
                                        <>
                                            {user?.logUser.addresses.map((address, index) => (
                                                <li key={index} className="flex justify-between gap-x-6 py-5">
                                                    <div className="flex gap-x-4">
                                                        <input
                                                            name="address"
                                                            onChange={handleAddress}          
                                                            type="radio"
                                                            value={index}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={imgAdres} alt="" />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                        <p className="text-sm leading-6 text-gray-900">Pin-Code:&nbsp; {address.postalCode}</p>
                                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                                            Phone: <time dateTime={address.state}>{address.phone}</time>
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </>
                                 

                            </ul>

                            <div className="mt-10 space-y-10">

                                <fieldset>
                                    <legend className="text-sm font-bold leading-6 text-gray-900">PAYMENTS</legend>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">These are Methods of payment</p>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="cash"
                                                name="payments"
                                                onChange={(e)=>handlePayment(e)}
                                                value="cash"
                                                checked={paymentMethod === "cash"}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                Cash
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-x-3">
                                            <input
                                                id="card"
                                                name="payments"
                                                onChange={handlePayment}
                                                value="card"
                                                checked={paymentMethod === "card"}
                                                type="radio"
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                Card
                                            </label>
                                        </div>

                                    </div>
                                </fieldset>
                            </div>
                        </div>



                    </form >

                </div>
                <div className="lg:col-span-2">
                    <div className=' mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white'>
                        <h1 className='flex justify-between font-bold text-center text-[2rem] border-2 mt-4 border-zinc-950 bg-cyan-300'>Cart <ShoppingCartIcon className="h-10 w-10" aria-hidden="true" /> </h1>
                        <div className="mt-8">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartProducts.map((item, index) => (
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
                                                            <a href={item.product.href}>{item.product.title}</a>
                                                        </h3>
                                                        <p className="ml-4">{item.product.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty

                                                        <select className='ml-[10px]' onChange={(e) => handleQntyChange(e, item)} value={item.quantity} >
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>

                                                    </p>

                                                    <div className="flex">
                                                        <button
                                                            onClick={() => handleRemove(item.id)}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
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
                                <p>${totalAmount} <br /> Total Items: {totalQuantity}</p>

                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                            <div className="mt-6">
                                <button
                                    onClick={handleOrder}
                                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Pay and Order
                                </button>
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
                </div>
            </div>
        </ >
    )
}

export default Checkout