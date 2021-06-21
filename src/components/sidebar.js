import React, {useEffect} from 'react'
import styled from 'styled-components'
import { Layout, Menu, Switch } from 'antd';
import {Link, useLocation} from 'react-router-dom'
import {adminAuthSelector} from '../api/auth'
import {useSelector} from 'react-redux'
import Logo from '../images/logo.png'
import Logo2 from '../images/logo_small.png'


import {
     AppstoreFilled, 
    ShopOutlined,
    DropboxOutlined,
    UsergroupAddOutlined,
    UserOutlined
  } from '@ant-design/icons';

const {  Sider } = Layout;

export default function Sidemenu({click, color, collapsed }) {

const {pathname} = useLocation()

const {admin } = useSelector(adminAuthSelector)
    return (
      <>
 { admin && <SideMenuWrap color={color}>

     
             <Sider trigger={null} collapsible collapsed={collapsed}>
             <div className="py-2 my-2" >
            {
              collapsed ?  <img src={Logo2} className="d-block mx-auto" width="30px" alt="logo"/> :

              <img src={Logo} className="d-block mx-auto" width="160px" alt="logo"/>
            }
            </div>
            
          <Menu
           theme={color? 'dark' : 'light'}
           mode="inline"
           defaultSelectedKeys={[pathname]}
           className="menu"
          >
           
          <Menu.Item key="/admin" icon={<AppstoreFilled />} >
           <Link to="/admin">Dashboard</Link> 
            </Menu.Item>
     
      <Menu.Item key="/admin/vendors" icon={<ShopOutlined />} > 
          <Link to="/admin/vendors">Vendors</Link>
          
          </Menu.Item>
{
  ( admin.role !== 'store_inigreater') &&   <>       <Menu.Item key="/admin/upload-product" icon={<DropboxOutlined />} > 
          <Link to="/admin/upload-product">Products</Link>
          
          </Menu.Item>
           
          <Menu.Item key="/admin/edit-profile" icon={<UserOutlined />} > 
          <Link to={`/admin/edit-profile/${admin._id}`}>Profile</Link>
          
          </Menu.Item>

        
          { ( admin.role !== 'subAdmin') && 
          <Menu.Item key="/admin/subadmin" icon={<UsergroupAddOutlined />} > 
          <Link to="/admin/subadmin">SubAdmins</Link>
          
          </Menu.Item>}
        </>
        }

          </Menu>
          <div className="mode">
         <Switch checkedChildren="Dark" unCheckedChildren="Light" onChange={()=>click()} />
          </div>

          
          <div className="copyright" style={{color:color? '#a6adb4' : 'black'}}>
           {
              collapsed ?  <p >&#169; Piklocal </p> :
              <p> Copyright &#169; 2021 Piklocal. All Rights Reserved</p>
           }
             </div> 

        </Sider>
        </SideMenuWrap>
}
        </>
      
    )
}


const SideMenuWrap = styled.div`



.menu{


font-size:1rem;
svg{

  font-size:1.1rem;
  transform:translate(-5px, -4px);
}

}

.mode{

position:absolute;
bottom:80px;
left:10%;

.ant-switch{

  background-color:${props=>props.color? "grey":"#1890FF"};
}
}


.copyright{
  position:absolute;
  bottom:5px;
  left:10%;
}

`

    {/* <SubMenu  key="sub1" icon={<UserOutlined/>} title="Vouchers">
 
           <Menu.Item key="2" >All vouchers</Menu.Item>
           <Menu.Item key="3" >Add new voucher</Menu.Item>

         </SubMenu> */}

         {/* <SubMenu  key="sub2" icon={<CodeSandboxSquareFilled />} title="Products">
 
        <Menu.Item key="4"  >All Products</Menu.Item>
        <Menu.Item key="5" >Add new Product</Menu.Item>

        </SubMenu> */}