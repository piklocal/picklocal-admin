import React, { useEffect,useState } from 'react'
import {fetchAllStores, storesSelector} from '../../../api/vendors'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../shared/loader'
import DataTable from './datatable'
import {Button,Input} from 'antd'
import {Link} from 'react-router-dom'
import {PlusOutlined,SearchOutlined} from '@ant-design/icons'
import {keyUri, config }  from '../../../key'
import axios from 'axios'
import {adminAuthSelector,fethFilter} from '../../../api/auth'
import Search from '../../shared/search'
import styled from 'styled-components'
export default function VenderIndex() {

    const dispatch = useDispatch()
    const [stores, setStores] = useState([])
    const {store_id, filter,filterproduct} = useSelector(adminAuthSelector)
    const [search, setSearch] = useState('')
    const {all_stores, loading} = useSelector(storesSelector)
useEffect(()=>{

    dispatch(fetchAllStores())

}, dispatch)




useEffect(()=>{     
    if(filter.length < 1) {

      setSearch('')

    }
     }, [filter])



  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(fethFilter('getallstore', e.target.value ))

}


    return (
        <div>
 <div className="d-flex  mb-4 align-items-center justify-content-between">
    <h5>Stores</h5>
    <div className="d-flex  mb-4 align-items-center justify-content-end">
    <Link to="/admin/create-vendor">
      <Button type="ghost" icon={<PlusOutlined />}>
            Create Store </Button></Link>
            <div className="mr-6">


 <SearchWrap className="mx-4">

<Input value={search}  className="px-2  focus:outline-none"
prefix ={  <SearchOutlined />
}
placeholder="Search" onChange={onSearch}  />
</SearchWrap>

</div>
{/* <Search title="all-faculty" collegeId={college_id}/> */}


</div>

</div>
            {
                loading ? <Loader/> :  <DataTable intialdata={( filterproduct.length > 0 )
                    ? filterproduct : all_stores} data={ stores }/>
            }
          
            
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