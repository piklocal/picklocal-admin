import React from 'react'
import { MenuUnfoldOutlined, LogoutOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import styled from 'styled-components'
import {UserOutlined  } from '@ant-design/icons';
import Dropdown from './shared/dropdown'
import {adminAuthSelector} from '../api/auth'
import {useSelector, useDispatch} from 'react-redux'

import MediaLibrary from './medialibrary'

const { Header } = Layout;

export default function HeaderMenu({collapsed, click}) {

const {admin} = useSelector(adminAuthSelector)

    return (
         <HeaderMenuWrap>
        <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="d-flex flex-end"> 
      {collapsed ?
         <MenuUnfoldOutlined className="trigger" onClick={()=>click()}/>
          :<MenuFoldOutlined className="trigger" onClick={()=>click()}/>}  

<MediaLibrary/>

 <div className="n">

<span className="mx-3 my-auto">
{admin &&  <Dropdown 
  username={admin.email}
  userIcon={<LogoutOutlined style={{fontSize:"1.2rem", transform:"translateY(-3px)", fontWeight:"bold"}}/>}
  icon={< UserOutlined style={{fontSize:"1.2rem", transform:"translateY(-3px)", fontWeight:"bold"}}/>}/> 
  }
    </span>

</div>
</div>

      
           
          </Header>

     

         </HeaderMenuWrap>
    )
}

const HeaderMenuWrap = styled.div`
.n{

  display:flex;
  justify-content:flex-end;
  line-height:64px;

  width:100%;

  button{

    margin: auto;
  }
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

      color: #1890ff; 
  }
}


.ant-badge-count{

top:25px;
}



#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover{

      color: #1890ff;
  }
}


.notification{

  font-size:1.7rem;
  line-height: 64px;

}


`
