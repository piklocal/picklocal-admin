import React,{useEffect} from 'react'
import styled from 'styled-components'
import { fetchAdminlogin, adminAuthSelector} from '../../api/auth'
import {  useDispatch, useSelector } from 'react-redux';
import LoginSection from '../shared/login'




export default function Login({history}) {

  const dispatch = useDispatch()
  const {isAuthenticate, loading} = useSelector(adminAuthSelector)
  useEffect(()=>{
        if(!isAuthenticate && !loading){
            history.push('/')
        }
        else{
            window.location.href = '/admin'
        }
  },[history, isAuthenticate])

    const onFinish = values => {

         dispatch(fetchAdminlogin(values))
        
     
      };
    
      // const onFinishFailed = errorInfo => {
      //   console.log('Failed:', errorInfo);
      // };
     

    return (
      <LoginWrap>
       

<LoginSection onFinish={onFinish} title="Admin Login Form" urllink="/register"/>

  
   </LoginWrap>
    )
}


const LoginWrap = styled.div`





`