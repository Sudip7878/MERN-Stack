import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        let result = await fetch("http://localhost:4501/list", {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (Array.isArray(result)) {
            setProduct(result)
        } else {
            setProduct([])
        }
        console.log(result); // Log the fetched products
    };

    const remove = async (id) => {
        let result = await fetch(`http://localhost:4501/delete/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if (result) {
            getProduct()
        }
    }


    const searchHandle = async (e) => {
        let key = e.target.value
        if (key) {
            let result = await fetch(`http://localhost:4501/search/${key}`, {
                method: "get",
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json()
            if (Array.isArray(result)) {
                setProduct(result)
            } else {
                setProduct([])
                console.log("search result is not an array", result)
            }
        } else {
            getProduct()
        }
    }

    return (
        <div>
            <h1>Product List</h1>
            <input className="search-bar" type="text" onChange={searchHandle} placeholder="Search" />
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Company</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.company}</td>
                            <td>
                                <button onClick={() => remove(item._id)}>Delete</button>
                                <Link to={`/update/${item._id}`}>Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
