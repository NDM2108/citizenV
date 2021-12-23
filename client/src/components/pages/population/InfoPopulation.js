import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { useEffect, useState } from "react"
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { CSmartTable } from '@coreui/react-pro'
import { useParams } from "react-router-dom";


const columns = [
    { field: 'id', headerName: 'ID Vùng', width: 90 },
    {
        field: 'fullname',
        headerName: 'Họ tên',
        width: 100,
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
        width: 100,
        editable: true,
    },
    {
        field: 'gender',
        headerName: 'Giới tính',
        width: 100,
        editable: true,
    },
    {
        field: 'hometown',
        headerName: 'Quê quán',
        width: 100,
        editable: true,
    },
    {
        field: 'permanentaddress',
        headerName: 'Địa chỉ thường trú',
        width: 100,
        editable: true,
    },
    {
        field: 'temporaryaddress',
        headerName: 'Địa chỉ tạm trú',
        width: 100,
        editable: true,
    },
    {
        field: 'educationallevel',
        headerName: 'Trình độ học vấn',
        width: 100,
        editable: true,
    },
    {
        field: 'job',
        headerName: 'Nghề nghiệp',
        width: 100,
        editable: true,
    },
    {
        field: 'religion',
        headerName: 'Tôn giáo',
        width: 100,
        editable: true,
    },
];


function InfoPopulation() {

    const { personID } = useParams();

    const [population, setPopulation] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/citizen_infos')
            .then(response => {
                const population = response.data
                setPopulation(population)
            })
    }, [])

    // console.log(population);
    var persons = population;
    var person = {};
    
    for (var i = 0; i < persons.length; i++) {
        // console.log(population[i]);
        if (population[i] !== undefined) {
            if (population[i].id == personID) {
                setTimeout(person = population[i],
                    console.log(person), 1000)
                    person = [person]
            }
        }

    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1 style={{ height: 20, fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>Thông tin cá nhân</h1>
            <br></br>
            <DataGrid
                rows={person}
                columns={columns}
                columnFilter
                columnSorter
                pagination
                autoHeight
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

export default InfoPopulation;