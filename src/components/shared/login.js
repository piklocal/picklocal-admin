import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import {Link} from "react-router-dom"
export default function Login({title, onFinish, urllink}) {

    
 

    return (
        <LoginWrap>

            <div className="logform">
            <h4 className="text-center text-sm-left mb-0 mb-sm-2 mt-3 mt-sm-0" style={{transform:"translateY(-1rem)", color:"#5F2703"}}>{title}</h4>
             <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true },
          {min: 8},
         
          { message:"Only Numbers"}
          ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

    
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {/* &nbsp;&nbsp;<b >{urllink ? 'Or' :null }</b>&nbsp;&nbsp;

     <Link to={urllink}>{urllink ? ' register now' :null }</Link> */}
      </Form.Item>
    </Form>
    </div>
        </LoginWrap>
    )
}


const LoginWrap =  styled.div`

height:86.8vh;

display:flex;
align-items:center;
justify-content:center;
.logform{

    box-shadow: 0px 3px 8px 2px #eceaea;
    padding: 2.5rem 1.5rem;
    transition:0.3s ease-in-out;

}
.ant-form{

    width:400px;
}



#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .ant-col-rtl .login-form-forgot {
  float: left;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}


@media(max-width:480px){

  .ant-form{

width:320px;
}

.logform{

  padding: 0.7rem 0.6rem;

}


  
}



`