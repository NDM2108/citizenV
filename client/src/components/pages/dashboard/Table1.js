import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'province',
    headerName: 'Tỉnh',
    width: 150,
    editable: true,
  },
  {
    field: 'population',
    headerName: 'Số dân',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'houses',
    headerName: 'Số hộ',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'progress',
    headerName: 'Tiến độ',
    width: 110,
    editable: true,
  },
];


function DataProvinces() {
  
  const [province, setProvince] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/provinces')
            .then(response => {
                const province = response.data
                setProvince(province)
            })
    }, [])
    console.log(province);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={province}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
          
}

export default DataProvinces