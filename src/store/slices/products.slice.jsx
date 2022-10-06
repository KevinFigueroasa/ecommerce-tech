import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const products = action.payload
            console.log(products)
            return products // retorna products(lo que viene desde el estado) y lo coloca en InitialState - es decir, cambia el estado
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true)) // Inicializa el valor de setIsLoading en True para que, cuando se esté realizanod la petición, aparesca la patalla de carga
    axios
    .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false))) // finalmente, setea el Slice setIsLoading con False cuando la petición se termina de realizar
}

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer