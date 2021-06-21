import React, {useState} from 'react'
import { Modal, Button } from 'antd';
import MediaTab from './mediatab'
export default function MediaLibrary() {

    const [isModalVisible, setIsModalVisible] = useState(false);



    const showModal = () => {

        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      }

    return (
        <div>
                <Button type="primary" onClick={showModal}>
        Upload Images
      </Button>
      <Modal
       width={1000}
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        okText="upload image"
        onCancel={handleCancel}
        
      >
    <MediaTab/>
      </Modal>
        </div>
    )
}
