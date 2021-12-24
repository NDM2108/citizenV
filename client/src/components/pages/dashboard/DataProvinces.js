import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'province',
    headerName: 'Tỉnh',
    width: 150,
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 className ="h1" style={{ /* height:20, fontSize: '20px' , */textAlign: 'center', marginTop: '10px' }}>Tiến độ khai báo dân số</h1>
      <br></br>
      <DataGrid
        rows={province}
        columns={columns}
        columnFilter
        columnSorter
        pagination
        pageSize={5}
        autoHeight
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        tableProps={{
          hover: true,
        }}
      />

    </div>

    
  );
          
}

export default DataProvinces