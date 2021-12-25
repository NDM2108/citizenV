import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'

const columns = [

  // { field: 'id', headerName: 'ID Vùng', width: 90 },
  {
    field: 'fullname',
    headerName: 'Họ tên',
    width: 250,
    editable: true,
  },
  {
    field: 'id',
    headerName: 'CCCD',
    // type: 'number',
    width: 160,
    editable: true,
  },
  {
    field: 'dob',
    headerName: 'Ngày sinh',
    type: 'date',
    width: 110,
    editable: true,
  },
  {
    field: 'province',
    headerName: 'Quê quán',
    width: 200,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    width: 150,
    editable: true,
  },
  {
    field: "action",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/population/" + params.row.id} >
            <Button
              variant="contained"
            // onClick={() => {}}
            >
              Xem
            </Button>
          </Link>
        </>
      );
    },
  },
  {
    field: ",",
    headerName: "",
    width: 100,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/population/" + params.row.id} >
            <Button
              variant="contained"
            // onClick={() => {}}
            >
              Xóa
            </Button>
          </Link>
        </>
      );
    },
  },
  
];


function DataPopulations() {

  const [population, setPopulation] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/citizen_infos', {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authentication": "Bearer " + localStorage.getItem('accessToken')
      }
    })
    .then(response => response.json())
    .then(data => {
      setPopulation(data)
    })
  }, [])
  console.log(population[0]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 className="h1" style={{ /* height:20, fontSize: '20px' , */textAlign: 'center', marginTop: '10px' }}>Thông tin dân số</h1>
      <br></br>
      <DataGrid
        rows={population}
        columns={columns}
        columnFilter
        columnSorter
        pagination
        autoHeight
        pageSize={5}
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

export default DataPopulations;