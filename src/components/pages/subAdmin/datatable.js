import React from 'react'
import { Table,  Space } from 'antd';
import {useDispatch} from 'react-redux'
import DeleteConfirm from '../../shared/deleteConfirm'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import Fade from 'react-reveal/Fade'
import {Link} from 'react-router-dom'
import {deletesubAdmin} from '../../../api/subAdmin'
export default function Datatable({data}) {

        const dispatch = useDispatch()


        const confirm = (e, id) => {
    
            dispatch(deletesubAdmin(id._id))
           
          }
          
          const cancel = (e) =>{
            return null
          }


    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <h6 style={{color:'var(--acentColor)'}} className="text-capitalize">{text}</h6>,
        },
        {
          title: 'Emails',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
        },
      
        {
          title: 'Action',
          key: 'action',
          render: (id) => {


          return  <Space size="middle">
              
              <h5 className="text-secondary">
               <Link to={`/admin/edit-subadmin/${id._id}`}>
                <FaRegEdit/> 
                 </Link> 
                
                
                </h5>
            <h5 className="text-danger">
                <DeleteConfirm confirm={(e)=>confirm(e, id)} title="subAdmin" cancel={cancel} >
                    <FaRegTrashAlt style={{cursor:"pointer"}} />
                </DeleteConfirm>
            </h5>

            </Space>
        },
        },
      ];



    return (
        <Fade>
            <Table   rowKey={record => record._id} columns={columns} dataSource={data} />
        </Fade>
    )
}
