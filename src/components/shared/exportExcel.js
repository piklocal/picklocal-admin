import React from 'react'
import { Excel } from 'antd-table-saveas-excel';
 import { Button } from 'antd'
 import { DownloadOutlined } from '@ant-design/icons';

export default function ExportExcel({ columns, dataSource }) {
    const cloneColumns = [...columns]      
    cloneColumns.pop()

    return (
    <div>                 
         <Button type="primary" icon={<DownloadOutlined /> } 
         style={{ marginBottom: 20, }} 
         onClick={() => { 

             const excel = new Excel();
             excel.addSheet('data1').addColumns(cloneColumns).addDataSource(dataSource).saveAs('Data.xlsx'); 
            }}  >   Export as Excel     </Button>   

                </div>)
}