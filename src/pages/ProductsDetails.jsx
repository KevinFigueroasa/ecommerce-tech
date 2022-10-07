import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addProductsCartThunk } from '../store/slices/productsCart.slice';

const ProductsDetails = () => {

    const { id } = useParams()

    const [amount, setAmount] = useState(1)
    const dispatch = useDispatch()

    const productsList = useSelector(state => state.products)

    const productDetails = productsList.find((product => product.id === parseInt(id)))  // transformo el id que viene desde el useParams como string a number para poder hacer la comparación Nota: puedo usar parseInt() o Number() para trasformar string a numberos
    console.log(productDetails)

    const releatedProducts = productsList.filter(product => (product.category.id) === productDetails.category.id)
    const releatedProducts2 = releatedProducts.filter(product => product.id !== productDetails.id)
    console.log(releatedProducts)

    const addToCart = () => {
        alert('agregando al carrito')
        const productsCart = {
            id: id,
            quantity: amount
        }
        dispatch(addProductsCartThunk(productsCart))
    }

    return (

        <Row>
            <Col>
                <img className='img-fluid' src={productDetails?.productImgs} width="600px" alt="" />
            </Col>
            <Col>
                <div>
                    <h1>Products Details: {id}</h1>
                    <h2>{productDetails?.title}</h2>
                    <p>{productDetails?.description}</p>
                </div>
                <div className='amount'>
                    <Button disabled={amount <= 1} className='me-3' onClick={() => setAmount(amount-1)}>
                        -
                    </Button>
                    {amount}
                    <Button className='ms-3' onClick={() => setAmount(amount+1)}>
                        +
                    </Button>

                    <Button className='ms-5' onClick={addToCart}>Add to cart</Button>
                </div>
            </Col>
            <div className='releated-products-container'>
                <ul>
                    {
                        releatedProducts2.map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}><li>{product.title}</li></Link>
                        ))
                    }
                </ul>
            </div>
        </Row>
    );
};

export default ProductsDetails;