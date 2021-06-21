import React from 'react'
import { Table,  Space } from 'antd';
import {useDispatch} from 'react-redux'
import DeleteConfirm from '../../shared/deleteConfirm'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'
import {deleteStore} from '../../../api/vendors'
import { Descriptions } from 'antd';
import {keyUri, config }  from '../../../key'


export default function Datatable({data,intialdata}) {

        const dispatch = useDispatch()


        const confirm = (e, id) => {
    
            dispatch(deleteStore(id._id))
           
          }
          
          const cancel = (e) =>{
            return null
          }



    const columns = [
        {
          title: 'Store',
          dataIndex: 'store_name',
          key: 'Store',
          render: text => <h6 style={{color:'var(--acentColor)'}} className="text-capitalize">{text}</h6>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Locality',
          dataIndex: 'locality',
          key: 'locality',
        },
        {
          title: 'image',
          dataIndex: 'image',
          key: 'image',
          render:(image) =>{

            return <img src={keyUri.STORE_IMAGE_URI +`/${image}`} alt="image_p" width="70px"/>
          }           
          
        },
        {
          title: 'Action',
          key: 'action',
          render: (id) => {


          return  <Space size="middle">
              
              <h5 className="text-secondary">
               <Link to={`/admin/edit-vendor/${id._id}`}>
                <FaRegEdit/> 
                 </Link> 
                
                
                </h5>
            <h5 className="text-danger">
                <DeleteConfirm confirm={(e)=>confirm(e, id)} title="store" cancel={cancel} >
                    <FaRegTrashAlt style={{cursor:"pointer"}} />
                </DeleteConfirm>
            </h5>

            </Space>
        },
        },
      ];


    

    return (
        <Fade duration = {1000}>
          {
            <Table    rowKey={record => record._id} 
            columns={columns}
            style={{overflowY:'auto', height:'75vh' }}
            
            expandable={{
             expandedRowRender: record => {
               return <div>
               <Descriptions title="Store Address" >
   
         {
           
         <h5>{record.store_address}</h5>  
 }
 
               </Descriptions>
               </div>
           }, 
             rowExpandable: record => record.store_address  !== null,
           }}
       
            dataSource={data.length < 1 ? intialdata : data }  />}
        </Fade>
    )
}
