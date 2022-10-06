import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


export const productsCartSlice = createSlice({
    name: 'productsCart',
    initialState: [],
    reducers: {
        setProductsCart: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
        .then(res => dispatch(setProductsCart(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProductsCart } = productsCartSlice.actions;

export default productsCartSlice.reducer;
