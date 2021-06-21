import React, {useEffect} from 'react'
import {Row, Col, Typography, Image} from 'antd'
import LoaderImage from '../shared/loading.gif'
import styled from 'styled-components'
import DeleteConfirm from '../shared/deleteConfirm'
import { deleteImage} from '../../api/vendors'
import {useDispatch, useSelector} from 'react-redux'
import {MdClose} from 'react-icons/md'

import {keyUri, config } from '../../key';

const { Paragraph } = Typography;

export default function UploadGImage({imagedata, imageType}) {

  const dispatch = useDispatch()


    const confirm = (e, id) =>{
      // console.log(id);
          //  let ele = e.target
           dispatch(deleteImage(id))
          //  ele = e.target.style.border = "3px solid blue"
      //  console.log(e.target.alt);

    }

    return (
        <UploadGWrap>
<Row gutter={20}>
            {

imagedata.map((item, i)=>{

    return <>
    
    <Col span={3} className="my-2 bg-light imgcontainer"  key={i}>
    <Image
      
        tabindex={item._id}
        width="90%"
        alt={`${item._id}`}
        style={{display:"block", margin:"auto"}}
        height="80px"
        src={keyUri.BACKEND_URI + `/${imageType.slice(0,-1)}/${item._id}`}
       preview={{visible:false}}
       className="selectimg"
        placeholder={
          <Image
          preview={{visible:false}}
            src={LoaderImage}
            width="100%"
            height="100%"
            className="bg-light"
          />
        }
      />
     <DeleteConfirm confirm={(e)=>confirm(e, item._id)} title="image" > 
              <MdClose className="close" />
   </DeleteConfirm>

      <Paragraph  className="text-center" copyable= {{ text: item._id }} >{item.filename}</Paragraph> 
         
    </Col>
  
    
    
    </>


})
            }
      </Row>      
        </UploadGWrap>
    )
}


const UploadGWrap = styled.div`
.selectimg:focus{

border:4px solid green;
padding:10px;
}

.close{

display:none;
color:red;
transform:translateY("-2rem");
}

.imgcontainer{
position:relative;
background-color:white !important;

&:hover~svg {

font-size:0.8rem;
position:absolute;
top:20%;
left:50%;
transform:translate(-50%, -50%);
color:red;

}  
}

`