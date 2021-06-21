import React, { useEffect } from 'react'
import {fetchAllsubAdmin, subAdminSelector} from '../../../api/subAdmin'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import {Button} from 'antd'
import {Link} from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'
export default function VenderIndex() {

    const dispatch = useDispatch()
    const {current_subadmin, loading} = useSelector(subAdminSelector)

useEffect(()=>{

    dispatch(fetchAllsubAdmin())

}, [dispatch])

console.log(current_subadmin);
    return (
        <div>
 <div className="d-flex  mb-4 align-items-center justify-content-between">
    <h5>SubAdmins</h5>
    <Link to="/admin/create-subadmin">
      <Button type="ghost" icon={<PlusOutlined />}>
            Create SubAdmin </Button></Link>
</div>
            {
                loading ? <Loader/> :  <DataTable data={current_subadmin}/>
            }
          
            
        </div>
    )
}
