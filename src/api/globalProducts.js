import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';

import {logoutAdmin} from './auth'
import  {keyUri, config }from '../key'


const initialState = {

    products:[],
    loading:false,
    hasError:false,
    currentProducts:[],
    currentCategories:[],
    allProducts:[]
}


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {

    getProducts: state => {
      state.loading = true;
    },
    getProductsSuccess: (state, {payload}) => {

      state.loading = false
      state.allProducts = payload
      state.currentCategories = payload.categories

    },

    getCurrentProduct:(state, {payload}) => {

      state.loading = false
      state.currentProduct = payload
      state.storeInfo = payload.store
    },

    getProductFailure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
});

export const { getProducts , getCurrentProduct, getProductsSuccess, getProductFailure } = productsSlice.actions;
export const productsSelector = state => state.products;



export const fetchProducts = () => async dispatch => {
  dispatch(getProducts())
 try {

  const {data} = await axios.get(keyUri.BACKEND_URI +`/product`, config)

  dispatch(getProductsSuccess(data.product));
   
 } catch (error) {

dispatch(getProductFailure())
   
 }
}


export const createProducts = (values, id) => async dispatch => {
  dispatch(getProducts())
  
  const key = 'create';
    message.loading({ content: 'loading...', key })
 
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/product`,values,config)
   data && message.success({content:data.msg, key, duration:2})
   dispatch(fetchProducts(data))

    

  } catch ({response}) {
 
 response.data && message.error({content:response.data.msg, key, duration:2})
    response.data && dispatch(logoutAdmin())
  }
 }



 export const deleteProducts = (id) => async dispatch =>{
    dispatch(getProducts())

    const key = 'create';
    message.loading({ content: 'loading...', key })

try {

    const {data} = await axios.delete(keyUri.BACKEND_URI +`/product/${id}`, config)
    window.location.reload()
    data && message.success({content:data.msg, key, duration:2})

} catch (error) {
  dispatch(getProductFailure())
 dispatch(logoutAdmin())
}


}



 export const fetchOneProduct = (id) => async dispatch => {

  dispatch(getProducts())
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/current-product/${id}`, config)
   dispatch(getCurrentProduct(data.product));

    
  } catch (error) {

 dispatch(getProductFailure())
 
  }
 };


 
 export const  updateProduct = (id, values) => async dispatch =>{
  const key = "product"
  dispatch(getProducts())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/product/${id}`, values, config);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchProducts())

} catch ({response}) {

    dispatch(getProductFailure())
    response.data && message.error({ content: response.data.msg, key, duration: 2 });
    response.data && dispatch(logoutAdmin())
}
}

export default productsSlice.reducer;
