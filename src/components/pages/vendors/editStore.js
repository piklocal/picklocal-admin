import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Upload, message, InputNumber, Switch } from 'antd';

import {updateStore, storesSelector,fetchOneStore} from '../../../api/vendors'
import {useDispatch,useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined } from '@ant-design/icons';
import {keyUri, config }  from '../../../key'
import axios from 'axios'


// const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 20 },
//   };

export default function EditStore() {
  
  const dispatch = useDispatch()
  const {current_store, loading} = useSelector(storesSelector)

  const [form] = Form.useForm();
  const [imgStatus, setImgStatus] = useState(false)

  const {id} = useParams()
  

  useEffect(()=>{
  
      dispatch(fetchOneStore(id))
      
      }, [dispatch])
  
   
  
      useEffect(()=>{

  
          form.setFieldsValue({
              store_name:current_store && current_store.store_name,
              email:current_store && current_store.email,
              contact_number:current_store && current_store.contact_number,
              store_address:current_store && current_store.store_address,
              role:current_store && current_store.role,
              longitude:current_store && current_store.loc.coordinates[0], 
              latitude:current_store && current_store.loc.coordinates[1],
              distance:current_store && current_store.distance / 1000,
              locality:current_store && current_store.locality,
              description: current_store && current_store.description,
              isAvailaible: current_store && current_store.isAvailaible,
         
        
            });
  
  
      }, [current_store])

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
  

      const normFile = e => {
        console.log('Upload event:', e);
        if(e.file.status === 'removed')
        {
          setImgStatus(true)
        }
        if(e.file.status === 'done')
        {
          setImgStatus(false)
        }

        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList[0];
      };

      const fileList =  [  
        {
          uid: '-1',
          name: 'Current image',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: keyUri.STORE_IMAGE_URI +`/${current_store && current_store.image}`,

          
        }];

      const onFinish = (values) => {
        var numbers = /^[0-9]+$/;


        if(values.contact_number && !values.contact_number.match(numbers))
        {
          message.error("Phone number must be only numbers")
          return true;
        }
        if(values.contact_number && values.contact_number.length !== 10){
          message.error("Phone number must be 10 numbers")
        }
        

        else
        {
        const imgdata = {

          store_name:values.store_name,
          store_address:values.store_address,
          image: values.image ? values.image.response.imgname : current_store.image,
          email:values.email,
          password:values.password,
          contact_number:values.contact_number,
          role:values.role,
          longitude:values.longitude,
          latitude:values.latitude,
          locality:values.locality,
          distance:values.distance * 1000 ,
          isAvailaible:values.isAvailaible


        }
      console.log(imgdata);
      
        dispatch(updateStore(id, imgdata))
      }
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };




    return (
           
<>
       
{
    // loading ? <Loader/> : 
    <div>
            <h4 className="mb-5">Update store</h4>

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
      <Input className=" text-capitalize"  /> 
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
            <InputNumber style={{ width: '90%' ,marginLeft:'23px' }} placeholder="longitude" />
          </Form.Item>


          <Form.Item
            name='distance'
       
            rules={[{ required: true, message: 'distance is required' }]}
          >
            <InputNumber style={{ width: '90%',marginLeft:'45px' }} placeholder="distance in meter" />
          </Form.Item>
 
      </Input.Group>
      </Form.Item>


      <Form.Item
       label="E-mail"
       rules={[{ required: true, message: 'Please input E-mail!' }]}

      >
      <Input.Group compact>

        
      <Form.Item
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
            <Input             autoComplete="off"
  style={{ width: '90%' }} placeholder="email" />
          </Form.Item>


      <Form.Item
            name="password"
            autoComplete="off"
            rules={[
              {
                min: 8,
                
              },
            ]}
            hasFeedback
        
         
          >
            <Input.Password  style={{ width: '90%' }} placeholder="password" />
          </Form.Item>

      <Form.Item
              name="confirm"
            
              dependencies={['password']}
              hasFeedback
              rules={[
                {min: 8},
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
        // rules={[
        //   {
        //     required: true,
        //     message: 'image is required!',
        //   },
        // ]}
      >
        <Upload name="image" action={keyUri.BACKEND_URI +`/uploads`} 
          maxCount={1}
          listType="picture"  defaultFileList={[...fileList]} >
       
          <Button disabled={imgStatus ? false : true} icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item> 


      <Form.Item
       label=" Contact Number"
       rules={[{ required: true, message: 'Please input contact number!' }
      ,
    {min:10}]}

      >
      <Input.Group compact>


      <Form.Item
         
         name='contact_number'

         rules={[{required: true
         }]}
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


     


      {/* <Form.Item
        name="image"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="image" action="/api/uploads"  listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>

      </Form.Item> */}
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
        rules={[{ required: true, message: 'Please input your store address!' }]}>
       <Input.TextArea />
</Form.Item>
      

<Form.Item
        label="isAvailaible"
        name="isAvailaible"
        rules={[{ required: true, message: 'Please input your isAvailaible!' }]}
        >

      <Switch defaultChecked={current_store && current_store.isAvailaible ? true: false} />

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

    
