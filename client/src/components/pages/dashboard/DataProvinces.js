import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'province',
    headerName: 'Tỉnh',
    width: 200,
    editable: true,
  },
  {
    field: 'progress',
    headerName: 'Tiến độ',
    width: 200,
    editable: true,
  },
];


function DataProvinces() {

  const [province, setProvince] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/get_inferiors', {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authentication": "Bearer " + localStorage.getItem('accessToken')
      }
    })
      .then(response => response.json())
      .then(data => {
        let s 
        if (localStorage.getItem('level') === 'A1') s = 'province'
        if (localStorage.getItem('level') === 'A2') s = 'district'
        if (localStorage.getItem('level') === 'A3') s = 'village'
        let progress = []
        for (let i = 0; i < data.length; i++) {
          progress.push(
            {id: data[i].id, name: data[i][s], status: data[i].status}
          )
        }
        console.log(progress);
        setProvince(data)
      })
  }, [])

  const [styleTable, setStyleTable] = useState({
    marginTop: "10px",
    width: "650px",
    display: "flex",
  });

  return (
    <MDBTable responsive>
        <div>
          <div>
            <h2 className="h2" style={{ textAlign: 'center', marginTop: '30px' }}>Tiến độ khai báo dân số</h2>
          </div>
          <div style={styleTable} id="datatable">
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
        </div>
    </MDBTable>
  );

}

export default DataProvinces