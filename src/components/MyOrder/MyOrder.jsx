import React, { useState, useEffect,useContext} from "react";
import "../MyOrder/MyOrder.css";
import { ShopContext } from "../Context/ShopContext";

const Api_URL = "https://e-commerce-full-stack-1.onrender.com";

const MyOrder = () => {
    const [orders, setOrders] = useState([]);
    const{all_product,cartItems,removeFromCart} = useContext(ShopContext);
 
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            fetch(Api_URL+'/MyOrders',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                      },body:"",
            }).then((response)=>{
               return response.json()
            }).then((data)=>setOrders(data));
        }
        }, []);

    return (
        <div>
            <div className="orderMain">
            <div className="orderDetail">
                <h3>Product</h3>
                <h3>Title</h3>
                <h3>Status</h3>
                <h3>Amount</h3>
            </div>
            <hr />
            {orders.map((order, ind) => (
                <div className="orderData" key={ind}> {/* Move key to the first div inside map */}
                    
                   
                    
                    <div>
                        {order.orderItems.map((orderItem,ind) => {
                             let product = all_product.find(product => product._id === orderItem);

                          return(<div className="productData">
                                
                                <img src={product.image} alt="" />
                                <p>{product.name}</p>
                            </div>
                        )})}
                    </div>
                    <p>{order.status}</p>
                    <p>{order.subtotal}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default MyOrder;
