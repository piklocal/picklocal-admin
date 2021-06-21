import React from 'react'
import { Menu, Dropdown, Button } from 'antd';
import {logoutAdmin} from '../../api/auth'

import {useDispatch} from 'react-redux'

export default function DropdownSec({username, userIcon, icon, history}) {

const dispatch = useDispatch()



    const menu = (
        <Menu>

<Menu.Item >
            <Button type="text" className="text-success " >
          {icon}  {username}
            </Button>
          </Menu.Item>

     <Menu.Item >
    
        <Button onClick={()=>{  dispatch(logoutAdmin()) }} type="link" danger  >
        {userIcon}Logout 
      </Button>
    


    {/* {
      isAdminAuthenticate && <Button onClick={()=>{

        dispatch(logoutAdmin())
      }} type="link" danger  >
     Logout Admin
      </Button>
    } */}
          
          </Menu.Item>
          
         
        </Menu>
      );



    return (
        <Dropdown overlay={menu}>
       { username && <Button type="primary"  shape="circle" onClick={e => e.preventDefault()}>
<b className="text-capitalize">{username.charAt(0)}</b>
       {/* {icon}  */}
        </Button>}
      </Dropdown>
    )
}
