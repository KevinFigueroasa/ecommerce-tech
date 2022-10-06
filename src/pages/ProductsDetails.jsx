import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductsDetails = () => {

    const { id } = useParams()

    const productsList = useSelector(state => state.products)

    const productDetails = productsList.find((product => product.id === parseInt(id)))  // transformo el id que viene desde el useParams como string a number para poder hacer la comparación Nota: puedo usar parseInt() o Number() para trasformar string a numberos
    console.log(productDetails)

    const releatedProducts = productsList.filter(product => (product.category.id) === productDetails.category.id)
    const releatedProducts2 = releatedProducts.filter(product => product.id !== productDetails.id)
    console.log(releatedProducts)

    return (
        <div>
            <h1>Products Details: {id}</h1>
            <ul>
                {
                    releatedProducts2.map(product => (
                        <Link to={`/products/${product.id}`}><li>{product.title}</li></Link>
                    ))
                }
            </ul>
            <h2>{productDetails?.title}</h2>
            <img className='fluid' src={productDetails?.productImgs} width="200px" alt="" />
        </div>
    );
};

export default ProductsDetails;