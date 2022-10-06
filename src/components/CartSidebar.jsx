import React, { useEffect } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsCartThunk } from '../store/slices/productsCart.slice';
import { purchaseCartThunk } from '../store/slices/productsCart.slice';

const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.productsCart)

    useEffect(() => {
        dispatch(getProductsCartThunk())
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup>
                    {
                        cartItems.map(item => (
                            <ListGroup.Item key={item.id}>
                                <Link to={`products/${item.id}`}>
                                    {item.title}
                                </Link>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                <Button>Chekout</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebar;