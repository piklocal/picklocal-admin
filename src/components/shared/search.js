import React from 'react'
import { Input } from 'antd';
import axios from 'axios'
import {fethFilter} from '../../api/auth'
import {useDispatch} from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components'
// const { Search } = Input;



export default function SearchComponent({title}) {
    console.log(title);
 const dispatch = useDispatch()
 
    const onSearch = (e) => {

        dispatch(fethFilter(title, e.target.value ))

    }


    return (
        <SearchWrap className="mx-4 shadow-md">
             <Input className="px-4 py-2 focus:outline-none"
            suffix={  <SearchOutlined />
            }
             placeholder=" Search " onChange={onSearch}  />
        </SearchWrap>
    )
}



const SearchWrap = styled.div`
width:80%;
transition:0.3s ease-in-out;
.ant-input-affix-wrapper > input.ant-input {
box-shadow: none !important;
&:focus{
    border-color:white !important;
}
&:hover{
    border-color:white !important;
}
}
`