import React ,{ useState ,useEffect} from 'react'
import { Upload, Button, Row, Col, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {fetchAllImages, storesSelector , deleteImage} from '../../../api/vendors'
import {useDispatch, useSelector} from 'react-redux'
import {MdClose} from 'react-icons/md'
import styled from 'styled-components'
import Loader from '../../shared/loader'

import MediaLibrary from '../../medialibrary'

import DeleteConfirm from '../../shared/deleteConfirm'
import {keyUri, config }  from '../../../key'

export default function UploadIndex() {

    const [visible, setVisible] = useState(false);
    
    const dispatch = useDispatch()
    const {allProductImages, loading} = useSelector(storesSelector)


    useEffect(()=>{
        dispatch(fetchAllImages())
    },[dispatch])


    const showModel = () => {
     setVisible(true)
     dispatch(fetchAllImages())

    }

    // const confirm = (e, id) => {
    //     dispatch(deleteProducts(id._id))  
    //   }
    //   const cancel = (e) =>{
    //     return null
    //   }


    return (
        <ImgWrap >
            <div className="d-flex justify-content-between">

            <Upload
      action={keyUri.BACKEND_URI +"/product-images"}
      listType="picture"
      name="multi_product_image"
      multiple={true}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>  

  <MediaLibrary/>
  
            </div>
   
      <Modal
        title="Product Images"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width="70%"
        bodyStyle={{height:"700px", overflowY:"scroll"}}
        footer={false}
        scroll={{ y: 260 }}
      >
        <Row justify="center" >
{
        loading? <Loader/> :
        allProductImages.map((item, i)=>{

        return  <Col className="m-2 p-2 bg-light imgcontainer" span={4} key={i}>
        <img className="d-block m-auto" src={keyUri.BACKEND_URI +`/product-image/${item._id}`} alt="imgproduct" width="80%" height="100px" />
        <p className="text-center pt-2">{item.filename}</p>
        <MdClose className="close" onClick={()=>dispatch(deleteImage(item._id))}/>
        {/* <DeleteConfirm confirm={(e)=>confirm(e, id)} title="blog" cancel={cancel}>
                    <FaRegTrashAlt style={{cursor:"pointer"}} />
                </DeleteConfirm> */}
            </Col>

})
}
        </Row>
      </Modal>  
    
    </ImgWrap>
    )
}


const ImgWrap = styled.div`
  height: 80vh;
  overflow-y: auto;


.close{

    display:none;
    color:red;
}

.imgcontainer{
position:relative;


 &:hover~svg {

    font-size:1rem;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    color:red;

}  
}

`