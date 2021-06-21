import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Upload, InputNumber, Switch  } from 'antd';
import {createStore} from '../../../api/vendors'
import {useDispatch} from 'react-redux'
import { UploadOutlined } from '@ant-design/icons';
import {keyUri, config }  from '../../../key'


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };


export default function CreateStore() {
  const [form] = Form.useForm();
  const [isAvailaible, SetisAvailaible] = useState(true)

    const dispatch = useDispatch();

 
    function onChange(checked) {
      console.log(`switch to ${checked}`);
      SetisAvailaible(checked)
    }


const onFinish = (values) => {
  
    const storedata = {
    
        store_name:values.store_name,
        longitude:values.longitude,
        latitude:values.latitude,
        distance:values.distance*1000,
        store_address:values.store_address,
        image:values.image.response.imgname,
        email:values.email,
        password:values.password,
        locality:values.locality,
        contact_number:values.contact_number,
        isAvailaible: isAvailaible

    }
    console.log(storedata);
 dispatch(createStore(storedata))
 form.resetFields()

};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const normFile = e => {
    console.log('is there', e.file.response);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    return e && e.file;
  };

    return (
        <CreateBlogWrap className="container ml-3">
            <h5 >Create Store</h5>
            <hr style={{height:"0.1rem"}} className="my-4 bg-light border-0"/>
             <Form
      {...layout}
      form={form}

      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

    <Form.Item
        label="Enter Store Name"
        name="store_name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >

        <Input />
      </Form.Item> 

      <Form.Item
       label="Store Location"
       rules={[{ required: true, message: 'Please input Store Location!' }]}

      >
      <Input.Group compact>


      <Form.Item
            name='latitude'
        
            rules={[{ required: true, message: 'latitude is required' }]}
          >
            <InputNumber style={{ width: '90%' }} placeholder="latitude" />
          </Form.Item>

      <Form.Item
            name='longitude'
       
            rules={[{ required: true, message: 'longitude is required' }]}
          >
            <InputNumber style={{ width: '90%',marginLeft:'23px' }} placeholder="longitude" />
          </Form.Item>


          <Form.Item
            name='distance'
       
            rules={[{ required: true, message: 'distance is required' }]}
          >
            <InputNumber style={{ width: '90%', marginLeft:'45px' }} placeholder="distance in kilometer" />
          </Form.Item>

         
      </Input.Group>
      </Form.Item>


      <Form.Item
       label="E-mail "
       rules={[{ required: true, message: 'Please input E-mail!' }]}

      >
      <Input.Group compact>
      <Form.Item
            name='email'
        
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
            <Input style={{ width: '90%' }} placeholder="email" />
          </Form.Item>


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
        name="image"
        label="Upload"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[
          {
            required: true,
            message: 'image is required!',
          },
        ]}
      >
        <Upload name="image" action={keyUri.BACKEND_URI +`/uploads`}  listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> 
      
      
      <Form.Item
       label="Contact Number"
       rules={[{ required: true, message: 'Please input contact number!' }]}

      >
      <Input.Group compact>


      <Form.Item
         
            name='contact_number'
            rules={[{ required: true },
              {min: 10, message:"Minimum 10 Numbers"},
              {max:10, message:"Maximum 10 Numbers"},
              {pattern:"[0-9]", message:"Only Numbers"}
              ]}
          >
           <Input style={{ width: '90%' }}/>
      </Form.Item>

      <Form.Item
            name='role'
       
            rules={[{ required: true, message: 'role is required' }]}
          >
            <Input style={{ width: '90%' }} placeholder="role" />
          </Form.Item>


        
      </Input.Group>
      </Form.Item>

      <Form.Item
         label="Locality"
            name='locality'
       
            rules={[{ required: true, message: 'Locality is required' }]}
          >
            <Input style={{ width: '90%' }} placeholder="locality" />
          </Form.Item>




      <Form.Item
        label="Store Address"
        name="store_address"
        rules={[{ required: true, message: 'Please input store address !' }]}>
     <Input.TextArea />
</Form.Item>

   
<Form.Item
        label="isAvailaible"
        name="isAvailaible"
        // rules={[{ required: true, message: 'Please input your isAvailaible!' }]}
        >
      <Switch defaultChecked onChange={onChange} />



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