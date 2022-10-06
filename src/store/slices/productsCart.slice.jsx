import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


export const productsCartSlice = createSlice({
    name: 'productsCart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }
    }
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
        .then(res => dispatch(setCart(res.data.data.cart)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = productsCartSlice.actions;

export default productsCartSlice.reducer;
