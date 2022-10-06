import React, { useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getCartThunk } from '../store/slices/productsCart.slice';


const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartThunk())
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