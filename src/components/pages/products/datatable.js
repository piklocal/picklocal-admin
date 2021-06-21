import React from 'react'
import { Table,  Space } from 'antd';
import {useDispatch} from 'react-redux'
import moment from 'moment'
import DeleteConfirm from '../../shared/deleteConfirm'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'
import {deleteProducts} from '../../../api/globalProducts'
import {keyUri, config }  from '../../../key'
import ExcelBtn from '../../shared/exportExcel'


  export default function Datatable({products, pagination, loading, handleTableChange }) {

        const dispatch = useDispatch()

        const confirm = (e, id) => {
            dispatch(deleteProducts(id._id))
           
          }
          
          const cancel = (e) =>{
            return null
          }

         


    const columns = [  
      
      {
        title: 'Product',
        dataIndex: 'product_name',
        key: 'product_name',
        render: text => <h6 style={{color:'var(--acentColor)'}} className="text-capitalize">{text}</h6>,
      },
      
      {
        title: 'Category',
        dataIndex: 'category_name',
        key: 'category_name',
        render: text => <p  className="text-capitalize">{text}</p>,
      },
      
        {
          title: 'MRP',
          dataIndex: 'MRP',
          key: 'MRP',
          render:(sale_price) =>{

            return <p>&#x20B9;{sale_price} </p>
          }
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          
        },
        {
          title: 'Product Image',
          dataIndex: 'image',
          key: 'image',
          render:(image) =>{

            return <img src={keyUri.BACKEND_URI +`/product-image/${image}`} alt="image_p" width="20px"/>
          }
          
        },
        {
          title: 'Action',
          key: 'action',
          render: (id) => {


          return  <Space size="middle">
              
              <h5 className="text-secondary">
               <Link to={`/admin/edit-products/${id._id}`}>
                <FaRegEdit/> 
                 </Link> 
                
                
                </h5>
            <h5 className="text-danger">
                <DeleteConfirm confirm={(e)=>confirm(e, id)} title="product" cancel={cancel}>
                    <FaRegTrashAlt style={{cursor:"pointer"}} />
                </DeleteConfirm>
            </h5>

            </Space>
        },
        },
      ];


return(  <Table
  columns={columns}

  dataSource={products}
  pagination={pagination}
  loading={loading}
  onChange={handleTableChange}
/>)

}
