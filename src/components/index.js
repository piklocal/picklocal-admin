import React, {useState, useEffect } from 'react'
import { Layout, Affix } from 'antd';
import styled from 'styled-components'
import SideBar from './sidebar'
import Header from './header'
import {  Route, Switch, useRouteMatch } from 'react-router-dom';
import Home from './pages/home'
import Vendor from './pages/vendors/createVendor'
import Vendors from './pages/vendors'
import EditeStore from './pages/vendors/editStore'
import UploadImage from './pages/uploadImage'
import Products from './pages/products'
import CreateProduct from './pages/products/createProduct'
import EditProduct from './pages/products/editProduct'
import SubAdmin from './pages/subAdmin'
import CreateSubAdmin from './pages/subAdmin/createsubAdmin'
import EditSubAdmin from './pages/subAdmin/editsubAdmin'

import EditProfile from './pages/profile/editProfile'
import {adminAuthSelector, fetchAdminProfile}  from '../api/auth'
import {useSelector, useDispatch} from 'react-redux'


const {  Content } = Layout;


export default function Admin() {

  let { path } = useRouteMatch();

    const [collapsed, setCollapsed] = useState(false)
    const [theme, setTheme] = useState(true)

const dispatch = useDispatch()
const token = localStorage.getItem('admintoken')? localStorage.getItem('admintoken') : null
useEffect(() => {
  token && dispatch(fetchAdminProfile(token))
}, [dispatch])

const  toggle = () => {

        setCollapsed(!collapsed)

      
      };

      const changeTheme = () =>{

        setTheme(!theme)
    
    }

    return (
        <AdminWrap color={theme}>
        <Layout>
     
        <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>

     <SideBar collapsed={collapsed} color={theme}  click={changeTheme}/>
     
</Affix>
        <Layout className="site-layout">
        
        <Header click={toggle} collapsed={collapsed}/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
        
        <Switch>

<Route  exact path={`${path}/`}  component={Home} />

<Route  exact path={`${path}/vendors`}  component={Vendors} />
<Route  exact path={`${path}/create-vendor`}  component={Vendor} />
<Route  exact path={`${path}/edit-vendor/:id`}  component={EditeStore} />

<Route  exact path={`${path}/upload-image`}  component={UploadImage} />

<Route  exact path={`${path}/upload-product`}  component={Products} />
<Route  exact path={`${path}/create-products`}  component={CreateProduct} />
<Route  exact path={`${path}/create-products`}  component={CreateProduct} />
<Route  exact path={`${path}/edit-products/:id`}  component={EditProduct} />

<Route  exact path={`${path}/subadmin`}  component={SubAdmin} />
<Route  exact path={`${path}/create-subadmin`}  component={CreateSubAdmin} />
<Route  exact path={`${path}/edit-subadmin/:id`}  component={EditSubAdmin} />


<Route  exact path={`${path}/edit-profile/:id`}  component={EditProfile} />


</Switch>
          </Content>
        </Layout>
      </Layout>
      </AdminWrap>
    )
}


const AdminWrap = styled.div`


.ant-layout {

.ant-layout-sider{
    height: 100vh;

    background:${props => props.color ? "#001529" : "#ffffff"};
}
}



.logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 16px;
}



#components-layout-demo-custom-trigger .logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 16px;
}

.site-layout .site-layout-background {
background: #fff;
}

`