import React, { useEffect, useState } from 'react'
import Loader from '../../shared/loader'
import styled from 'styled-components'
import { BarChartOutlined, FundOutlined, DiffOutlined,ShopOutlined, TeamOutlined } from '@ant-design/icons';
import {adminAuthSelector} from '../../../api/auth'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button,Avatar, Row, Col, notification} from 'antd'
import YearGraph from './yearStoreGraph'
import axios from 'axios'
import {keyUri, config }  from '../../../key'
import {fetchAllStores, storesSelector} from '../../../api/vendors'
import moment from 'moment'

export default function DashIndex() {

const [yearChart, setYearChartData] = useState([])
const [stores, setStores] = useState([])

const [customer, setCustomer] = useState([])
const [offlineOrders, setOfflineOrders] = useState([])
const [onlineOrders, setOnlineOrders] = useState([])

const {admin} = useSelector(adminAuthSelector)
// const {all_stores, loading} = useSelector(storesSelector)

const dispatch = useDispatch()


useEffect(()=>{
    axios.get(keyUri.BACKEND_URI + `/fetch-storechart`, config).then((data=>{
        setYearChartData(data.data)
    })) 

    axios.get(keyUri.BACKEND_URI +`/getallstore`, config).then((data=>{
      const curr_monthStores = data.data.filter(item=>{
        return moment(item.createdAt).format('MM') === moment().format('MM')
     })
     setStores(curr_monthStores)
    })) 


    axios.get(keyUri.BACKEND_URI + `/all-user`, config).then((data=>{
      const curr_monthUser = data.data.user.filter(item=>{
        return moment(item.createdAt).format('MM') === moment().format('MM')
     })
      setCustomer(curr_monthUser)
    })) 

    axios.get(keyUri.BACKEND_URI + `/all-orders`, config).then((data=>{

      const curr_monthOrder = data.data.order.filter(item=>{
        return moment(item.createdAt).format('MM') === moment().format('MM')
     })
      const online = curr_monthOrder.filter((item)=>{
        return item.user
      })
      const offine = curr_monthOrder.filter((item)=>{
        return !item.user 
      })
      setOfflineOrders(offine)
      setOnlineOrders(online)
    })) 
  },[])


  // useEffect(()=>{
  //   dispatch(fetchAllStores())

  // },[dispatch])



    let dashcard = [
        {
            title:"Vendors",
            icon:<ShopOutlined/>,
            stat: stores && stores.length,
            desc:"Number of Stores",
            backColor:"#263055"
        },
          {
            title:"Customers",
            icon:<TeamOutlined/>,
            stat: customer && customer.length,
            desc:"Number of App users",
            backColor:"#1BC943" 
        },
        {
            title:"Online Orders",
            icon:<FundOutlined/>,
            stat: onlineOrders && onlineOrders.length,
            desc:"Number of Online Orders",
            backColor:"#5383FF" 
        },
   
        {
          title:"Offline Orders",
          icon:<BarChartOutlined/>,
            stat:offlineOrders && offlineOrders.length,
            desc:"Number of Offline Orders",
            backColor:"#F83245"
        }
    ]


    const [connected, setConnected] = useState(false);


    // const openNotificationWithIcon = () => {
    //   notification.success({
    //     message: 'New Order Placed',
    //     description:
    //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    //   });
    // };





    return (
        <HomwWrap>
           { <div className='d-flex justify-content-between'> 
             <h5 className="text-capitalize"> welcome <b className="text-info">{admin && admin.name}</b></h5>
              
            </div> }

              <hr style={{height:"0.1rem"}} className="my-4 bg-light border-0"/>

            <Row gutter={20}>          
               {
                 dashcard.map((item, i)=>{

                    return <Col key={i} span={6}>
                    
                    <div className=" customcard">

                    <div>

                      <h6 className="text-secondary">
                           <Avatar size="large" className="mr-2" style={{backgroundColor:item.backColor}} icon={item.icon} /> {item.title}
                           
                    </h6> 
                    </div>
                      <div className="text-center">
                     <h1 className="mb-2">{item.stat}</h1>
                     <p className="text-secondary">{item.desc}</p>
                    </div>
                    </div>
                    
                    </Col>

                 })
               }
            </Row>

            {/* <div className="my-4 d-flex justify-content-between  sec2">   

            <div className="mr-4 w-100 graph">
            <h2> Stores </h2>
                    <YearGraph data={yearChart} />
            </div>
            </div> */}

           
   <div className="my-3 d-flex   sec2">         

       
              <div className="mx-5 pr-5 "  >
                    <h2> Stores </h2>
                    <YearGraph data={yearChart} />
              </div>
         
       </div> 
 

        </HomwWrap>

      
    )
}



const HomwWrap =  styled.div`
.sec2{
  .graph, .order {
padding:1rem;
border-radius:0.5rem;
/* box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12); */
height: 46vh;
    overflow-y: auto;
    overflow-x: hidden;

  }   
  .graph{

    overflow-y: hidden;

}  
}
.customcard {
padding:1rem;
border-radius:0.5rem;
box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
h1{
    font-weight:300;
    color:#070919;
}
svg {
    color:white;
    transform:translateY(-7px);
    font-size:1.1rem;
}    
}
`