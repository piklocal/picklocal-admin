import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import  {keyUri, config }from '../key'

// const adminInfo = localStorage.getItem('admin') ?
//   JSON.parse(localStorage.getItem('admin')) : null

  const token = localStorage.getItem('admintoken') ?
  localStorage.getItem('admintoken') : null

const initialState = {

    admin: null,
    token:token,
    loading:false,
    hasError:false,
    isAuthenticate: token ? true : false,
    current:[],
    filterproduct:[],
    filter:[]
    

}


export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {

    getAdminLogin: state => {
      state.loading = true;
    },
    getAdminLoginSuccess: (state, {payload}) => {

      state.admin = payload
      state.loading = false
      state.suplliers = payload
      state.isAuthenticate = true

    },
    getFilter: (state, {payload}) =>{

      
      state.loading = false;
      state.current = payload

    },

    isAuthenticateError: state =>{

      state.hasErrors = true;
      state.loading = false;
      state.isAuthenticate = false


    },

    getAdminLoginFailure: (state) => {

      state.loading = false
      state.hasError = true
    },
    getProductFilter: (state, {payload}) =>{
      console.log(payload);
      state.loading = false;
      state.filterproduct = payload

    },

    getCurrent_Admin_Success: (state, {payload}) =>{

      state.loading = false
      state.current = payload  

    
    },
    
   
  },
});

export const { getAdminLogin , getProductFilter,  getAdminLoginSuccess,getFilter,getCurrent_Admin_Success,   getAdminLoginFailure , getAdminRegister,isAuthenticateError} = adminAuthSlice.actions;
export const adminAuthSelector = state => state.auth;




export const fetchAdminlogin = (values) => async dispatch => {

  dispatch(getAdminLogin())

  const key = 'delete';
    message.loading({ content: 'loading...', key })

 try {

  const {data} = await axios.post( keyUri.BACKEND_URI + '/adminAuth', values, config)
 data && message.success({content:data.msg, key, duration:2})

    localStorage.setItem("admintoken", data.token)
    // localStorage.setItem("admin", data.admin)

  dispatch(getAdminLoginSuccess(data));
   
 } catch ({response}) {
    response.data && message.error({content:response.data.msg, key, duration:2})

console.log(response);

dispatch(getAdminLoginFailure())

   
 }
}


export const fetchAdminRegister = (Regdata) => async dispatch => {
  dispatch(getAdminLogin())

  try {

    const { data } = await axios.post(keyUri.BACKEND_URI + '/admin', Regdata, config)
  
    dispatch(getAdminLoginSuccess(data))

    localStorage.setItem("admintoken", data.token)

  } catch (error) {

    dispatch(getAdminLoginFailure())
  }
}



export const fetchAdminProfile = (token) => async dispatch => {
 
  const loginConfig  = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
 
  dispatch(getAdminLogin())

  try {

    const { data } = await axios.get(keyUri.BACKEND_URI + '/subAdminProfile',  loginConfig)
    dispatch(getAdminLoginSuccess(data))


  } catch (error) {
  dispatch(logoutAdmin())
    dispatch(getAdminLoginFailure())
  }
}




export const logoutAdmin = ()=>  dispatch=>{

    try {
        localStorage.removeItem('admintoken')

        window.location.reload();
        
    } catch (error) {
        dispatch(getAdminLoginFailure())
    }
}



export const fethFilter = (filter, value) => async dispatch =>{

  console.log(value, filter);
  try {
      const {data} = await axios.get(keyUri.BACKEND_URI + `/${filter}?search=${value}&filter=${filter}`, config)
      dispatch(getProductFilter(data))


  } catch (error) {

      dispatch(isAuthenticateError())
  }

}



// export const fethFilters = (filter, value) => async dispatch =>{

//   console.log(value, filter);
//   try {
//       const {data} = await axios.get(keyUri.BACKEND_URI + `/getallstore?search=${value}&filter=${filter}`)
//       dispatch(getStoreFilter(data))


//   } catch (error) {

//       dispatch(isAuthenticateError())
//   }

// }


export const fetchOneAdmin = (id) => async dispatch => {
console.log(id)
  dispatch(getAdminLogin())
  try {
 
    const {data} = await axios.get(keyUri.BACKEND_URI +`/admin/${id}`)
  
   dispatch(getCurrent_Admin_Success(data.admin));


  } catch (error) {

 dispatch(getAdminLoginFailure())
  }
 };


 
export const fetchAllAdmin = () => async dispatch => {

  dispatch(getAdminLogin())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +'/admin', config)
 

   
   dispatch(getAdminLoginSuccess(data));
    
  } catch (error) {
 
 dispatch(getAdminLoginFailure())
 
    
  }
 };

 export const  updateAdmin = (id, values, admin) => async dispatch =>{
  const key = "admin"
  dispatch(getAdminLogin())
  message.loading({ content: 'loading...', key })
try {

    const {data} = await axios.patch(keyUri.BACKEND_URI +`/admin/${id}`, values, config);
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(getAdminLoginSuccess(admin))

} catch ({response}) {
    dispatch(getAdminLoginFailure())
    response.data && message.success({ content: response.data.msg, key, duration: 2 });

}

}

export default adminAuthSlice.reducer;
