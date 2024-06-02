import React from "react";
import { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [company, setCompany] = useState("")
    const [category, setCategory] = useState("")
    const [error, setError] = useState(false)


    const Addproduct = async (e) => {
        //integrating api
        if (!name && !price && !company && !category) {
            setError(true)
        } else {
            let result = await fetch('http://localhost:4501/add', {
                method: "post",
                body: JSON.stringify({ name, price, company, category }),
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (result) {
                alert("product has been added")
            }
            console.log(result)
        }
    }

    return (
        <div>
            <h1>Add Product</h1>
            <form>
                <input className="input-box" type="text" placeholder="Enter Product Name" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                {error && !name &&<span className="blank-input">Please Enter Name</span>}

                <input className="input-box" type="text" placeholder="Enter Product Price" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                {error && !price &&<span className="blank-input">Please Enter Price</span>}
                
                <input className="input-box" type="text" placeholder="Enter Product Company" value={company} onChange={(e) => { setCompany(e.target.value) }}></input>
                {error && !company &&<span className="blank-input">Please Enter Company</span>}

                <input className="input-box" type="text" placeholder="Enter Product Category" value={category} onChange={(e) => { setCategory(e.target.value) }}></input>
                {error && !category &&<span className="blank-input">Please Enter Category</span>}<br></br>


                <button type="button" className="btn" onClick={Addproduct}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct