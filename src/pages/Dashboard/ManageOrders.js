import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const ManageOrders = () => {
    const [orders, setOrders] = useState([])
    const [user] = useAuthState(auth)
    const { email } = user
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/booking`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken')
                    navigate('/');
                }
                return res.json()
            })
            .then(data => {
                setOrders(data)
            })
    }, [email, orders, navigate])
    const handleShipping = id => {
        fetch(`http://localhost:5000/booking/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(),
        }).then(res => res.json().then(data => {
            console.log(data);
        }))
    }
    return (
        <div>
            <h1 className='text-2xl text-center'>My orders: {orders.length}</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((o, index) => <tr
                                key={index}>
                                <th>{index + 1}</th>
                                <td>{o.product}</td>
                                <td>{o.quantity}</td>
                                <td>
                                {(o.status === '') && <span className='text-error'>Not Paid</span>}
                                    {(o.status === 'paid') && <button onClick={() => handleShipping(o._id)} className='btn btn-sm btn-success'>Ship</button>}
                                    {(o.status === 'ship') && <span className='text-success'>Shipping</span>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;