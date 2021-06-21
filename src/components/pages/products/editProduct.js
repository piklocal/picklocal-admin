import React, {useEffect, useState} from 'react'
import { Form, Input, Button, InputNumber, Upload  } from 'antd';
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {updateProduct, productsSelector, getCurrentProduct, fetchOneProduct} from '../../../api/globalProducts'
import {useParams} from 'react-router-dom'
import Loader from '../../shared/loader';
import { UploadOutlined } from '@ant-design/icons';
import {adminAuthSelector} from '../../../api/auth'
import {keyUri, config }  from '../../../key'

// const layout = {
//     labelCol: { span: 4 },
//     wrapperCol: { span: 20 },
//   };

export default function EditProduct() {
 
  const dispatch = useDispatch()
  const {currentProduct, loading} = useSelector(productsSelector)
  const [form] = Form.useForm();
  const {id} = useParams()
  const [imgStatus, setImgStatus] = useState(false)


  useEffect(()=>{
  
      dispatch(fetchOneProduct(id))
      
      
      }, [dispatch])
  
 
  
      useEffect(()=>{
  
          form.setFieldsValue({
            category_name:currentProduct && currentProduct.category_name,
            product_name:currentProduct && currentProduct.product_name, 
            MRP:currentProduct && currentProduct.MRP,
            GST:currentProduct && currentProduct.GST,
            quantity:currentProduct && currentProduct.quantity,
            // image:currentProduct && currentProduct.product_image,
         
            product_description:currentProduct && currentProduct.product_description,
            });
  
  
      }, [currentProduct])

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
          thumbUrl: keyUri.BACKEND_URI +`/product-image/${currentProduct && currentProduct.image}`,

        }];

      const onFinish = (values) => {

        const imgdata = {

          category_name:values.category_name,
          product_name:values.product_name,
          MRP:values.MRP,
          GST:values.GST,
          quantity:values.quantity,

          image: values.product_image ? values.product_image.response.file.id : currentProduct.image,

          product_description:values.product_description,

        }
      dispatch(updateProduct(id, imgdata))
        
        };


        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };

        
    return (          
<>  
       {
          //  loading ? <Loader/> : 
           <div>
            <h4 className="mb-5">Update Product</h4>
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
            <InputNumber style={{ width: '90%',marginLeft:'24px' }} placeholder="GST " />
          </Form.Item>    
      </Input.Group>
      </Form.Item>
   

<Form.Item
       label="Upload"
       rules={[{ required: true, message: 'quantity is required!' }]}

      >

<Input.Group compact>
        
        {/* <Form.Item
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
              <Upload  name="category_image" action={keyUri.BACKEND_URI +"/category-image"}   listType="picture">
                <Button icon={<UploadOutlined />}>Category Image</Button>
              </Upload>
            </Form.Item>  */}

            <Form.Item
            //  style={{ width: '23%' }}
              name='product_image'
         
              valuePropName="file"
              getValueFromEvent={normFile}
              // rules={[
              //   {
              //   required:true,
              //   message:'Product image is required'
              //   }
              // ]}
            >
              <Upload  name="product_image" action={keyUri.BACKEND_URI +"/product-image"} 
               maxCount={1}
              listType="picture" defaultFileList={[...fileList]} >
                <Button disabled={imgStatus ? false : true} icon={<UploadOutlined />}>Product Image</Button>
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
        rules={[{ message: 'Please input your product description!' }]}>
     <Input.TextArea />
</Form.Item>




<Form.Item wrapperCol={{ span: 20, offset: 4}}>
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
       