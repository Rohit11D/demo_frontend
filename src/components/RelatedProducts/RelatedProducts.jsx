import React from "react";
import "./RelatedProducts.css";
import { useState,useEffect } from "react";
import Item from '../Item/Item.jsx';
const Api_URL = "https://e-commerce-full-stack-1.onrender.com"
const RelatedProducts = () =>{
    const [popularProducts,setPopularProducts] = useState([]);
    useEffect(()=>{
        fetch(Api_URL+'/newcollections')
        .then((response)=>response.json())
        .then((data)=>setPopularProducts(data));
  },[])
    return (
        <div className="relatedproducts">
<h1>Related Products</h1>
<hr />
<div className="relatedproducts-item">
    {popularProducts.map((item,index)=>{
        return <Item  key={index} id={item.id} name={item.name}
        image={item.image} new_price={item.new_price} old_price={item.old_price}/>
    })}
</div>
        </div>
    )
}

export default RelatedProducts;