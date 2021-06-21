import { Button } from 'antd';
import React from 'react'
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export default function ExportExcel({data}) {

    return (
        <ExcelFile element={<Button className="mr-2" type="primary">Export </Button>}>
        <ExcelSheet data={data} name="Products" >

            <ExcelColumn label="product_name" value="product_name"/>
            <ExcelColumn label="barcode" value={col=>col.barcode? col.barcode : "null"}/>
            <ExcelColumn label="category_name" value={col => col.category_name? col.category_name : "null"}/>
            <ExcelColumn label="MRP" value="MRP"/>
            <ExcelColumn label="GST" value="GST"/>
            <ExcelColumn label="quantity" value="quantity"/>
            <ExcelColumn label="image" value="image"/>
            <ExcelColumn label="product_description" value="product_description"/>

        </ExcelSheet>
   
    </ExcelFile>
    )
}
