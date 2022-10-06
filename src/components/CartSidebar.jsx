import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Login from '../pages/Login';
import { getProductsCartThunk } from '../store/slices/productsCart.slice';

const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsCartThunk())
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement={"end"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Productos listados
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebar;