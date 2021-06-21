import React from 'react'
import { Upload, message, Radio } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {keyUri, config }  from '../../key'

const { Dragger } = Upload;

export default function UploadImage() {

  const [value, setValue] = React.useState('product-images');

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };


    const props = {
        name: (value==="product-images") ? 'multi_product_image' : "multi_category_image",
        multiple: true,
        action: keyUri.BACKEND_URI + `/${value}`,
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };



    return (
        <div>
          <div className="m-3">
        <Radio.Group onChange={onChange} value={value}>
      <Radio value='product-images'>Product Image</Radio>
      <Radio value='category-images'>Category Image</Radio>
    </Radio.Group>
    </div>
              <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
        </div>
    )
}
