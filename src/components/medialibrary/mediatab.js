import React, {useEffect} from 'react'
import { Tabs, Radio , message} from 'antd';
import UploadLocalImage from './uploadLImage'
import {fetchAllImages, storesSelector} from '../../api/vendors'
import {useDispatch, useSelector} from 'react-redux'
import GloabalImages from './uploadGImage'
import Loader from '../shared/loader'
import {keyUri, config } from '../../key'

import {
    GlobalOutlined,
    DesktopOutlined 
  
  } from '@ant-design/icons';

const { TabPane } = Tabs;


export default function Mediatab() {
    const dispatch = useDispatch()
    const {allProductImages,allCategoryImages, loading} = useSelector(storesSelector)


    const [value, setValue] = React.useState('product-images');

    const onChange = e => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
      dispatch(fetchAllImages(e.target.value))
    };
    


    useEffect(()=>{

        dispatch(fetchAllImages(value))

    }, [dispatch])


    function callback(key) {
        console.log(key);
      }

    return (
        <div>
       
            <Tabs 
            defaultActiveKey="1" onChange={callback}>

    <TabPane tab={
        <span>
            <GlobalOutlined/>
            Global Images
        </span>
    } key="1" style={{ height: 650, overflowY:"auto", padding:'0.5rem 2rem 0 2rem' }}>
        <div className="mb-3 pt-0 mt-0">


            <Radio.Group onChange={onChange} value={value}>
            <Radio value='product-images'>Product Image</Radio>
            <Radio value='category-images'>Category Image</Radio>
            </Radio.Group>
    </div>
        {

            loading ? <Loader/> :  <GloabalImages imageType={value} 
               imagedata = {value ==='product-images' ? allProductImages : allCategoryImages}/>
        }
     
    </TabPane>
    <TabPane tab={
        <span>
            <DesktopOutlined/>
            Local Images
        </span>
    } key="2" style={{ height: 650, overflowY:"auto", padding:'2rem'}}>
     <UploadLocalImage/>
    </TabPane>
 
  </Tabs>  
  
        </div>
    )
}





