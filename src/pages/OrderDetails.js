import React, { useEffect, useState } from 'react'

export default function OrderDetails() {

    const [cartItem, setCartItem] = useState([]);

    useEffect(() => {
        let data = localStorage.getItem('MY_ORDERS')
        // debugger
        if (data) {
            data = JSON.parse(data);
            setCartItem(data)
            localStorage.clear('MY_CART');
            localStorage.setItem('MY_ORDERS', JSON.stringify(data));
        }
    },[]);

  return (
    <div>
        <h2>CheckOut</h2>

        <div className='row justify-content-center' >
                        {cartItem.map((element, index) => (
                            <div
                                style={{
                                    padding: 20, marginRight: 10, marginBottom: 10, width: "230px",
                                    border: "1px solid red", borderRadius: "6px"
                                }}
                                key={element.id}
                            >
                                <div className='products'>
                                    <img
                                        src={element.productImg}
                                        style={{
                                            width: 150, height: 150, borderRadius: 5
                                        }}
                                    ></img>
                                    <hr />
                                    <p>{element.name}</p>
                                    <b>
                                        <p>
                                            {"\u20b9"}{element.price}
                                        </p>
                                    </b>
                                </div>

                            </div>
                        ))}
                    </div>
        </div>
  )
}
