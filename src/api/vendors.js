import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import  {keyUri, config }from '../key'
import { logoutAdmin} from './auth'

const initialState = {

    all_stores:[],
    loading:false,
    hasError:false,
    allProductImages:[],
    allCategoryImages:[]
}


export const vendorSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    getStores: state => {
      state.loading = true;
    },

getAll_stores_success: (state, {payload})  =>{

    state.loading = false
    state.all_stores = payload

},

getCurrentSuccess: (state, {payload}) =>{
    state.loading = false
    state.current_store = payload.store  
  
  },

getAll_images:(state,{payload}) =>{
  state.allProductImages = payload.productImages
  state.allCategoryImages = payload.categoryImages
  state.loading = false

},

    get_stores_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getStores ,getAll_images, getAll_stores_success, getCurrentSuccess,  get_stores_Failure } = vendorSlice.actions;



export const storesSelector = state => state.vendors;




export const fetchAllStores = () => async dispatch => {

  dispatch(getStores())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/getallstore`, config)
 
   
   dispatch(getAll_stores_success(data));
    
  } catch (error) {
 
 dispatch(get_stores_Failure())
 
    
  }
 };


 export const fetchAllImages = (value) => async dispatch => {

  dispatch(getStores())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI + `/${value}`)
 

   dispatch(getAll_images(data));
    
  } catch (error) {
 
 dispatch(get_stores_Failure())
 
    
  }
 };


 export const deleteStore = (id) => async dispatch => {

  dispatch(getStores())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/store/${id}`, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllStores());
    
  } catch (response) {

 dispatch(get_stores_Failure())
 response.data && message.error({ content: response.data.msg, key, duration: 2 });
 response.data && dispatch(logoutAdmin())
  }
 };

 export const deleteImage = (id) => async dispatch => {

  dispatch(getStores())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/product-images/${id}`)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllImages());
    
  } catch (error) {

 dispatch(get_stores_Failure())
 
  }
 };



 export const createStore = (values) => async dispatch => {

  dispatch(getStores())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/createstore`, values, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllStores());
    
  } catch (response) {

 dispatch(get_stores_Failure())
 response.data && message.error({ content: response.data.msg, key, duration: 2 });
 response.data && dispatch(logoutAdmin())
  }
 };


 export const fetchOneStore = (id) => async dispatch => {

  dispatch(getStores())

  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/current-store/${id}`, config)
  
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_stores_Failure())
  }
 };



 export const  updateStore = (id, values) => async dispatch =>{
  const key = "store"
  dispatch(getStores())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/store/${id}`, values, config);

    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllStores())
    // window.location.reload()

} catch ({response}) {

    dispatch(get_stores_Failure())
    response.data && message.error({ content: response.data.msg, key, duration: 2 });
    response.data && dispatch(logoutAdmin())
}
}

export default vendorSlice.reducer;
