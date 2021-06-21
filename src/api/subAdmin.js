import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import  {keyUri, config }from '../key'
import { logoutAdmin} from './auth'

// import { getAllSubAdmin } from '../../../server/controller/admin/subAdmin';

const initialState = {

    subAdmins:[],
    loading:false,
    hasError:false,
    current_subadmin:[],
}

export const subAdminSlice = createSlice({
  name: 'subadmins',
  initialState,
  reducers: {

    getsubAdmin: state => {
      state.loading = true;
    },

getAll_subAdmin_success: (state, {payload})  =>{

    state.loading = false
    state.subAdmins = payload.admin
    state.current_subadmin = payload.admin


},


getCurrent_subAdmin_Success: (state, {payload}) =>{
    state.loading = false
    state.current_subAdmin = payload  
  
  },

    get_subAdmin_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getsubAdmin ,getAll_subAdmin_success, getCurrent_subAdmin_Success, get_subAdmin_Failure } = subAdminSlice.actions;



export const subAdminSelector = state => state.subadmins;




export const fetchAllsubAdmin = () => async dispatch => {

  dispatch(getsubAdmin())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +'/subAdmin', config)
 

   
   dispatch(getAll_subAdmin_success(data));
    
  } catch (error) {
 
 dispatch(get_subAdmin_Failure())
 dispatch(logoutAdmin())
    
  }
 };


 export const deletesubAdmin = (id) => async dispatch => {

  dispatch(getsubAdmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/subAdmin/${id}`, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllsubAdmin());
    
  } catch (error) {

 dispatch(get_subAdmin_Failure())
 dispatch(logoutAdmin())

  }
 };


 export const createsubAmin = (values) => async dispatch => {

  dispatch(getsubAdmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/subAdmin`, values, config)

  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllsubAdmin());
    
  } catch (error) {

 dispatch(get_subAdmin_Failure())
 dispatch(logoutAdmin())

  }
 };


 export const fetchOnesubAdmin = (id) => async dispatch => {

  dispatch(getsubAdmin())
  try {
 
    const {data} = await axios.get(keyUri.BACKEND_URI +`/subAdmin/${id}`, config)
  
   dispatch(getCurrent_subAdmin_Success(data.admin));


  } catch (error) {

 dispatch(get_subAdmin_Failure())
 dispatch(logoutAdmin())

  }
 };



 export const  updatesubAdmin = (id, values) => async dispatch =>{
  const key = "store"
  dispatch(getsubAdmin())
  message.loading({ content: 'loading...', key })
try {

    const {data} = await axios.put(keyUri.BACKEND_URI +`/subAdmin/${id}`, values, config);
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllsubAdmin())

} catch ({response}) {
    dispatch(get_subAdmin_Failure())
    response.data && message.error({ content: response.data.msg, key, duration: 2 });
    response.data && dispatch(logoutAdmin())

}

}

export default subAdminSlice.reducer;
