import React, {useEffect} from 'react'
import { Form, Input, Button, InputNumber, Select } from 'antd';
import {updatesubAdmin, subAdminSelector,fetchOnesubAdmin} from '../../../api/subAdmin'
import {useDispatch,useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

// const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 20 },
//   };

export default function EditStore() {
  
  const dispatch = useDispatch()
  const {current_subAdmin, loading} = useSelector(subAdminSelector)
  
  const [form] = Form.useForm();
  
  const {id} = useParams()
  
  useEffect(()=>{
  
      dispatch(fetchOnesubAdmin(id))
      
      
      }, [dispatch])
  
    
      useEffect(()=>{
  
          form.setFieldsValue({
            name:current_subAdmin && current_subAdmin.name,
            email:current_subAdmin && current_subAdmin.email,
            role:current_subAdmin && current_subAdmin.role,
            });
  
  
      }, [current_subAdmin])

      const layout = {
        labelCol: {
          span: 4,
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

        const subadmin = {

          name:values.name,
          email:values.email,
          password:values.password,
          role:values.role,

        }

      
        dispatch(updatesubAdmin(id, subadmin))
        
        };
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };



    return (

<>
       
{
    loading ? <Loader/> : 
    <div>
            <h4 className="mb-5">Update SubAdmin</h4>

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
       rules={[{ required: true, message: 'password must be at list 8 character!' }]}

      >
      <Input.Group compact>


      <Form.Item
            name='password'
            rules={[
              { 
                min: 8,

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
                min: 8

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

<Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>
    </div>

}
        </>
    ) 
    }

    
