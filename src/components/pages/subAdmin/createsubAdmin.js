import React from 'react'
import styled from 'styled-components'
import { Form, Input, Button,  Select  } from 'antd';
import {createsubAmin} from '../../../api/subAdmin'
import {useDispatch} from 'react-redux'
import { UploadOutlined } from '@ant-design/icons';


const { Option } = Select;
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };


export default function CreatesubAdmin() {
  const [form] = Form.useForm();

    const dispatch = useDispatch();

 

const onFinish = (values) => {

    const subAdmindata = {
    
        name:values.name,
        email:values.email,
        password:values.password,
        role:values.role,
    
    }
dispatch(createsubAmin(subAdmindata))
form.resetFields()

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};



    return (
        <CreateBlogWrap className="container ml-3">
            <h5 >Create SubAdmin</h5>
            <hr style={{height:"0.1rem"}} className="my-4 bg-light border-0"/>
             <Form
      {...layout}
      form={form}

      name="subadmin"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

    <Form.Item
        label="Enter Name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >

        <Input />
      </Form.Item> 

      
  
      <Form.Item
            name='email'
            label="Email"
        
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
       label="Password"
       rules={[{ required: true, message: 'password must be at list 8 character' }]}

      >
      <Input.Group compact>


      <Form.Item
            name='password'
            rules={[
                { 
                  min: 8,
                  required: true,
                  message: 'password must be at list 8 character!',
                },
              ]}
              hasFeedback
          >
            <Input.Password style={{ width: '90%' }} placeholder="password" />
          </Form.Item>

      <Form.Item
            name="confirm"
       
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                min: 8,
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
            <Input.Password style={{ width: '90%' }} placeholder="confirm" />
          </Form.Item>

      </Input.Group>
      </Form.Item>
   
<Form.Item
        label="SubAdmin"
        name="role"
        rules={[{ required: true, message: 'Please input your role!' }]}
        >

<Select  style={{ width: 120 }} >
      <Option value="admin">Super-Admin</Option>
      <Option value="subAdmin">Sub-Admin</Option>
      <Option value="store_inigreater" >
      Store Integrator
      </Option>
     
    </Select>

</Form.Item>

<Form.Item wrapperCol={{ span: 20, offset: 4}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
   
   

    </Form>
        </CreateBlogWrap>
    )
}

const CreateBlogWrap = styled.div`


`