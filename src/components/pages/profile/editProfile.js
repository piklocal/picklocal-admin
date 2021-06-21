import React, {useEffect} from 'react'
import { Form, Input, Button, InputNumber, Switch } from 'antd';
import {updateAdmin, adminAuthSelector,fetchOneAdmin} from '../../../api/auth'
import {useDispatch,useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined } from '@ant-design/icons';

// const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 20 },
//   };

export default function EditAdmin() {
  
  const dispatch = useDispatch()
  const {current, loading} = useSelector(adminAuthSelector)
  console.log(current);
  
  const [form] = Form.useForm();
  
  const {id} = useParams()
  
  useEffect(()=>{
  
      dispatch(fetchOneAdmin(id))
      

      }, [dispatch])
  
    
      useEffect(()=>{
  
          form.setFieldsValue({
            name:current && current.name,
            email:current && current.email,
        
            });
  
  
      }, [current])

      const layout = {
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 16,
        },
      };
    
      const tailLayout = {
        wrapperCol: {
          offset: 4,
          span: 16,
        },
      };
  

      const onFinish = (values) => {

        const admindata = {

          name:values.name,
          email:values.email,
          old_password:values.password,
          new_password:values.new_password,
          confirm_password:values.confirm_password
          
        }

        dispatch(updateAdmin(id,admindata, current))
        
        };

        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };



    return (

<>
       
{
loading ? <Loader/> : 
    <>
    <div>
            <h4 className="">Edit Profile</h4>

            <Form
    {...layout}
    form={form}

    name="basic"
    initialValues={{ remember: true }}
  
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >


<Form.Item
        label="Enter Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >

        <Input />
      </Form.Item> 

      
  
      <Form.Item
          
            label="Email"
            name="email"
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
      <Input/>
          </Form.Item>


<Form.Item
        label="Old Password"
         name="password"
            rules={[
                   {
                   min: 8,
                   required: true,
                 message: 'password must be at list 8 character!',
                },
               ]}
              hasFeedback
           >
        <Input.Password  placeholder="old password" />
   </Form.Item>
 

   <Form.Item
        label="New Password"
         name="new_password"
            rules={[
                   {
                   min: 8,
                   required: true,
                 message: 'password must be at list 8 character!',
                },
               ]}
              hasFeedback
           >
        <Input.Password  placeholder="new password" />
   </Form.Item>

   <Form.Item
        label="Confiem Password"
         name="confirm_password"
            rules={[
                   {
                   min: 8,
                   required: true,
                 message: 'password must be at list 8 character!',
                },
               ]}
              hasFeedback
           >
        <Input.Password  placeholder="confirm password" />
   </Form.Item>

<Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
    </div>

</>
}
        </>
    ) 
    }

    
