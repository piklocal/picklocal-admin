import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

// const DemoLine: React.FC = () => {
export default function Graph(data) {

  var config = {
    data: data.data,
    xField: '_id',
    yField: 'stores',
    label: {},
    height:400,
    width:1200,
    yAxis: {
      tickInterval:1,
        },
        point: {
            size: 4,
            shape: 'circle',
            style: {
              fill: 'blue',
              stroke: '#5B8FF9',
              lineWidth: 1,
            },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowColor: 'yellow',
          shadowBlur: 4,
          stroke: 'transparent',
          fill: 'red',
        },
      },
    },
    theme: {
      geometries: {
        point: {
          diamond: {
            active: {
              style: {
                shadowColor: '#FCEBB9',
                shadowBlur: 2,
                stroke: '#F6BD16',
              },
            },
          },
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };
  return <Line {...config} />;
};

// export default DemoLine;