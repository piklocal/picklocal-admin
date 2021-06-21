import React, {useEffect} from 'react'
import {
    Form,
    Input,
    Button,
 
  } from 'antd';

  import {fetchAdminRegister, adminAuthSelector} from '../../api/auth'
import { useDispatch, useSelector } from 'react-redux';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

export default function RegisterAdmin({history}) {
    const {isAuthenticate, loading} = useSelector(adminAuthSelector)

    const dispatch = useDispatch()


    useEffect(()=>{

        if(!isAuthenticate && !loading){
            history.push('/register');
          }
          else{
            history.push('/');
          }
        
    
    }, [isAuthenticate, history])


    const onFinish = values => {
        console.log(values);
        dispatch(fetchAdminRegister(values))
      };

    return (
        <div className="container mb-5 my-5">

          <h3 className="py-3 text-center text-secondary">Registration</h3>
             <Form {...layout} 
             name="nest-messages"
              onFinish={onFinish} >


    

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
  
      
      {/* <Form.Item name='phone_number'
       label="Phone Number" 
       rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="address" label="Address">
        <Input.TextArea />
      </Form.Item> */}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}
