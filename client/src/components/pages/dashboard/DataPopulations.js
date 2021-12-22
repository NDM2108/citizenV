import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'

const columns = [
  
  { field: 'id', headerName: 'ID Vùng', width: 90 },
  {
    field: 'fullname',
    headerName: 'Họ tên',
    width: 150,
    editable: true,
  },
  {
    field: 'card',
    headerName: 'CCCD',
    // type: 'number',
    width: 100,
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
    field: 'hometown',
    headerName: 'Quê quán',
    width: 400,
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
    headerName: " ",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/population/" + params.row.id} >
            <Button
              variant="contained"

              // onClick={() => {}}
            >
              Xem thông tin
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
        axios.get('http://localhost:5000/citizen_infos')
            .then(response => {
                const population = response.data
                setPopulation(population)
            })
    }, [])
    // console.log(population);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1 style={{ height:20, fontSize: '20px' ,textAlign: 'center', marginTop: '10px' }}>Tiến độ khai báo dân số</h1>
      <br></br>
      <DataGrid
        rows={population}
        columns={columns}
        columnFilter
        columnSorter
        pagination
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        tableProps={{
          hover: true,
        }}
      />

    </div>

    
  );
          
}

export default DataPopulations;