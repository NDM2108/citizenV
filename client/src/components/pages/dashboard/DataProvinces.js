import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';




function DataProvinces() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Tỉnh/Thành phố',
      width: 200,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Quận/Huyện',
      width: 200,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Xã/Phường',
      width: 200,
      editable: true,
    },
    {
      field: 'name',
      headerName: 'Thôn/Xóm',
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

  const levelAccount = localStorage.getItem('level')
  console.log(levelAccount);

  var role = 0;

  if (levelAccount == 'A1') {
    role = 0;
  } else if (levelAccount == 'A2') {
    role = 1;
  } else if (levelAccount == 'A3') {
    role = 2;
  } else if (levelAccount == 'B1') {
    role = 3;
  }

  const cols = [
    columns[0],
    columns[role + 1],
    columns[5],

  ];



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
            { id: data[i].id, name: data[i][s], progress: data[i].progress }
          )
        }
        console.log(progress);
        setProvince(progress)
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
            columns={cols}
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