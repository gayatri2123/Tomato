import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios" 
const PlaceOrder = () => {
  const { getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone:""
  })
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error")
    }
  }

  const navigate =  useNavigate();

  useEffect(() => {
    if (!token) {
     navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  },[token,getTotalCartAmount, navigate]
 )

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='first name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName}  type="text" placeholder='last name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  type="email" placeholder='email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street}  type="text" placeholder='street' />
         <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city}  type="text" placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state}  type="text" placeholder='State'/>
        </div>
         <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode}  type="text" placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country}  type="text" placeholder='country'/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone}  type="text" placeholder='Number' />
      </div>
      <div className="place-order-right">
 <div className="cart-total">
          <h2>cart totals</h2>
          <div>
            <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
<button>Procced to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
