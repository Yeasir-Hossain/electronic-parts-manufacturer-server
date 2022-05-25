import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../shared/Loading';
import Tool from './Tool';

const Tools = () => {
    const { isLoading, data: products } = useQuery(['product'], () =>
        fetch(`http://localhost:5000/product`)
            .then(res => res.json())
    )
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='my-10'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 justify-items-center rounded-2xl mx-auto mt-[-70px] relative z-20 bg-base-100  shadow-lg shadow-white p-10 w-5/6'>
                {
                    products.slice(0,3).map(product=><Tool
                    key={product._id}
                    product={product}
                    >
                    </Tool>)
                }
            </div>
        </div>
    );
};

export default Tools;