import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Update = ()=>{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [company, setCompany] = useState("")
    const [category, setCategory] = useState("")
    const [error, setError] = useState(false)
    const params = useParams() //this gets the parameter from url
    const navigate = useNavigate()

    useEffect(()=>{
        getdetails()
    },[])
    // console.log(params.id)
    const getdetails = async()=>{
        let result = await fetch(`http://localhost:4501/prefil/${params.id}`,{
            method:"get",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }
    const updating = async()=>{
        let result = await fetch(`http://localhost:4501/update/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,company,category}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result=await result.json()
        navigate('/')
    }

    
    return(
        <div>
            <h1>Update Product</h1>
            <form>
                <input className="input-box" type="text" placeholder="Enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                {error && !name &&<span className="blank-input">Please Enter Name</span>}

                <input className="input-box" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                {error && !price &&<span className="blank-input">Please Enter Price</span>}
                
                <input className="input-box" type="text" placeholder="Enter Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
                {error && !company &&<span className="blank-input">Please Enter Company</span>}

                <input className="input-box" type="text" placeholder="Enter Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
                {error && !category &&<span className="blank-input">Please Enter Category</span>}<br></br>


                <button type="button" className="btn" onClick={updating}>Update</button>
            </form>
        </div>
    )
}

export default Update