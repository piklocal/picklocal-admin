import React from 'react'
import { Popconfirm  } from 'antd';

export default function DeleteConfirm({children, title="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        title={`Are you sure delete this ${title}?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
