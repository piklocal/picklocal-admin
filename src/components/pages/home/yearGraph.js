import React, { PureComponent } from 'react';
import styled from 'styled-components'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


export default function Graph(data) {
console.log(data)
    return (
        <GraphWrap width="100%" height="100%">  
        <LineChart
        width={600}
        height={350}
        data={data.data}
        margin={{
          top: 5, right: 10, left: 5, bottom: 5,
        }}
      >
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" style={{marginTop:"20px"}} dataKey="stores" stroke="#8884d8" activeDot={{ r: 6 }} />

      </LineChart>


        </GraphWrap>
    )
}


const GraphWrap = styled.div`


`