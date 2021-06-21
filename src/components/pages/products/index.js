import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import {Button, Upload} from 'antd'
import { UploadOutlined,SearchOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'
import { Select,Input } from 'antd';
import {keyUri, config }  from '../../../key'
import axios from 'axios'
import ExportExcel from './excelBtn'
import styled from 'styled-components'

const { Option } = Select;

export default function AdminIndex() {

    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
    
    })

    console.log(pagination);
    
    const dispatch = useDispatch()


  useEffect(()=>{

  fetch2({ pagination })
 
  },[dispatch])



  const  fetch2 = (params = {}) => {
    const {current,  pageSize, } = params.pagination
    const {search} = params
    
        setLoading(true)
       axios.get(keyUri.BACKEND_URI + `/product?search=${search}&skip=${current}&limit=${pageSize}`, config)
        .then(({data}) => {

          if(search){
            pagination.current = 1
              }
          setLoading(false)
          setProducts(data.product);
          setPagination({
            ...params.pagination,
               total: data.numberproduct
              })    
        });
      };


      const handleTableChange = (pagination) => {

        fetch2({    
        pagination,
        search:search,
        });  
      };
    
    
    

  const onSearch = (e) => {

    const searchvalue = e.target.value
    setSearch(searchvalue)

    fetch2({    
      pagination,
      search:searchvalue,
      });  

}

  
    return (
        <div>

 <div className="d-flex  mb-4 align-items-center justify-content-between">
   <div className="d-flex   align-items-center justify-content-start">


<Upload
      action={keyUri.BACKEND_URI + `/productByExel`}
      listType="file"
      name="file"
      className="mr-3"
    >
      <Button icon={<UploadOutlined />}>Upload file</Button>
    </Upload> 

    <ExportExcel data={products}/>
    </div>

    <div className="d-flex   align-items-center justify-content-end">
    <Link to="/admin/create-products">
      <Button type="ghost" icon={<PlusOutlined />}>
            Create Products </Button></Link>
            <div className="mr-6">


                  <SearchWrap className="mx-4">

             <Input value={search}  className="px-2 focus:outline-none"
            prefix ={  <SearchOutlined />
            }
             placeholder="Search" onChange={onSearch}  />
        </SearchWrap>
        </div>
                          
             
              </div>
                 
    </div>
           
<DataTable
    products={ products } 
    pagination={pagination}
    loading={loading}
    handleTableChange={handleTableChange}
    />
    </div>
    )
}


const SearchWrap = styled.div`
width:90%;
transition:0.3s ease-in-out;
.ant-input-affix-wrapper > input.ant-input {
&:focus{
    border-color:white !important;
}
&:hover{
    border-color:white !important;
}
}

`