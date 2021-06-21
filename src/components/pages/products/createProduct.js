import React, { useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import BarcodeReader from 'react-barcode-reader'

import { Form, Input, Button, InputNumber, Upload  } from 'antd';
// import Select from '../../../Shared/select'
import {createProducts} from '../../../api/globalProducts'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {adminAuthSelector} from '../../../api/auth'
import {keyUri, config }  from '../../../key'



const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };


export default function CreateProducts() {


  const {categories,allProducts , loading} = useSelector(adminAuthSelector)
  const [result, setResult] = useState('')
  const [code, setCode] = useState(null)
  const [barcodeSubmit, setBarcodeSubmit] = useState(false)

    const dispatch = useDispatch();


    const handleScan = (data) =>{
      setResult(data)

      setBarcodeSubmit(true)

  }
    const handleError = (err) => {
     console.log(err);
    }




const onFinish = (values) => {

 
    const productdata = {

       category_name:values.category_name,
       product_name:values.product_name,
       MRP:values.MRP,
       GST:values.GST,
       quantity:values.quantity,
       image:values.product_image.response.file.id,
       category_image:values.category_image.response.file.id,
       product_description:values.product_description,   
       barcode:result === ''? code : result
     
    }



  dispatch(createProducts(productdata))


};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  };



  const handleBarCode = (e) =>{

    setCode(e.target.value)
    
    
    }

    return (
        <CreateBlogWrap className="container ml-3">
          <h4 className="mb-5">Create Products</h4>
            <hr style={{height:"0.1rem"}} className="my-4 bg-light border-0"/>
             <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <Form.Item
       label="Name"
       rules={[{ required: true, message: 'Please input Category Name'}]}

      >
      <Input.Group compact>


      <Form.Item
            name='category_name'
        
            rules={[{ required: true, message: 'Category Name is required' }]}
          >
            <Input style={{ width: '90%' }} placeholder="Category Name" />
          </Form.Item>

      <Form.Item
            name='product_name'
       
            rules={[{ required: true, message: 'product name is required' }]}
          >
            <Input style={{ width: '90%' }} placeholder="product name" />
          </Form.Item>

      </Input.Group>
      </Form.Item>

      <Form.Item
        label="Barcode"
        
        >
 
   <Input onChange={(e)=>handleBarCode(e)} 
   disabled={result === ''? false :true }
   placeholder={result === ''? 'scan or enter barcode': result}/>


</Form.Item>

      <Form.Item
       label="Price"
       rules={[{ required: true, message: 'Please input Store Location!' }]}

      >

      <Input.Group compact>
        
      


          <Form.Item
            name='MRP'
       
            rules={[{ required: true, message: 'MRP is required' }]}
          >
            <InputNumber style={{ width: '90%' }} placeholder="MRP " />
          </Form.Item>

          <Form.Item
            name='GST'
       
            rules={[{ required: true, message: 'GST is required' }]}
          >
            <InputNumber style={{ width: '90%',marginLeft:'25px' }} placeholder="GST " />
          </Form.Item>    
      </Input.Group>
      </Form.Item>
   

<Form.Item
       label="Upload"
       rules={[{ required: true, message: 'quantity is required!' }]}

      >

<Input.Group compact>
        
        <Form.Item
        style={{ width: '20%' }}
              name='category_image'
         
              valuePropName="file"
              getValueFromEvent={normFile}
              rules={[
                {
                required:true,
                message:'Category image is required'
                }
              ]}
            >
              <Upload  name="category_image" action= {keyUri.BACKEND_URI +"/category-image"} listType="picture">
                <Button icon={<UploadOutlined />}> Category Image </Button>
              </Upload>
            </Form.Item> 
            

            <Form.Item
        style={{ width: '20%' }}
              name='product_image'
         
              valuePropName="file"
              getValueFromEvent={normFile}
              rules={[
                {
                required:true,
                message:'Product image is required'
                }
              ]}
            >                                        
              <Upload  name="product_image" action= {keyUri.BACKEND_URI +"/product-image"}  listType="picture">
                <Button icon={<UploadOutlined />}> Product Image </Button>
              </Upload>
            </Form.Item> 
        
      <Form.Item
            name='quantity'
            rules={[{ required: true, message: 'quantity is required' }]}
          >
            <Input style={{ width: '90%' }} placeholder="quantity" />
          </Form.Item>

  
      </Input.Group>
      </Form.Item>

      
      <Form.Item
        label="Product Description"
        name="product_description"
        rules={[{  message: 'Please input your product description!' }]}>
     <Input.TextArea />
</Form.Item>




<Form.Item wrapperCol={{ span: 20, offset: 4}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
   
   
    </Form>



    <BarcodeReader
          onError={handleError}
          onScan={handleScan}
          />



        </CreateBlogWrap>
    )
}


const CreateBlogWrap = styled.div`


`