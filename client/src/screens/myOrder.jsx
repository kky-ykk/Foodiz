import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        // console.log(localStorage.getItem('userEmail'));
        await fetch(`https://foodiz.onrender.com/api/myorderData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            await setOrderData(response);
            // await console.log("datas", orderData);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className='row' key={new Date()}>

                    {orderData != {} ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item, itemIndex) => {
                                    return (
                                        <div key={itemIndex} className='w-100'>
                                            {item.some(arrayData => arrayData.Order_date) &&
                                                <div className='w-100 text-center mt-5'> {/* updated date div */}
                                                    <div>{item[0].Order_date}</div>
                                                    <hr />
                                                </div>
                                            }
                                            <div className='d-flex flex-wrap'> {/* updated flex */}
                                                {item.map((arrayData, arrayIndex) => {
                                                    return (
                                                        !arrayData.Order_date && // updated condition to exclude Order_date from card rendering
                                                        <div className='col-12 col-md-6 col-lg-3' key={`${itemIndex}-${arrayIndex}-card`}> {/* updated key */}
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{item[0].Order_date}</span> {/* display date */}
                                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                }) : <div className='text-center'>
                                    <h3>No orders found</h3>
                                    <Link className="btn bg-white text-warning mx-1" to="/">
                                        Order Now
                                    </Link>
                                </div>
                        );
                    }) : <div className='text-center'>
                        <h3>No orders found</h3>
                        <Link className="btn bg-white text-warning mx-1" to="/">
                            Order Now
                        </Link>
                    </div>}
                </div>
            </div>
            <Footer />
        </>
    );
}
