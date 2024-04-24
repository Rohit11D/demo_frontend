import React,{createContext, useEffect, useState} from "react";
// import all_product from "../Assests/all_product.js";
// we use useStae for allproducts 
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {}; //empty object
    for(let index=0;index<300+1;index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{
const [all_product,setAll_Product] = useState([]);
const [cartItems,setCartItems] = useState(getDefaultCart());
const Api_URL = "https://e-commerce-full-stack-1.onrender.com";
useEffect(()=>{
    fetch(Api_URL+'/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_Product(data))
    if(localStorage.getItem('auth-token')){
        fetch(Api_URL+'/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
                  },body:"",
        }).then((response)=>{
           return response.json()
        }).then((data)=>setCartItems(data));
    }
},[])

const getTatalCartAmount = ()=>{
    let totalAmount = 0;
    for(const item in cartItems){
        if(cartItems[item]>0){
            
            let itemInfo = all_product.find((product)=>product.id===Number(item));
           
            const np =itemInfo.new_price;
            totalAmount += np * cartItems[item];
        }
    }
    //console.log(totalAmount);
    return totalAmount;
}
const getTatalCartItems =()=>{
    let totalItem = 0;
    for(const item in cartItems){
        totalItem += cartItems[item];
    }
    return totalItem;
}
const addToCart = (itemId)=>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
//console.log(cartItems);
if(localStorage.getItem('auth-token')){
    fetch(Api_URL+'/addtocart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
    })
    .then((response)=>response.json);
    // .then((data)=>//console.log(data));
}
}

const removeFromCart = (itemId)=>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if(localStorage.getItem('auth-token')){
    fetch(Api_URL+'/removefromcart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
    })
    .then((response)=>response.json);
    // .then((data)=>//console.log(data));
    }
}

    

    const contextValue = {getTatalCartItems,getTatalCartAmount,all_product,cartItems,addToCart,removeFromCart};   
return(
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
)
}
export default ShopContextProvider;