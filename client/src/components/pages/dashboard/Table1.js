import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
// import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { CSmartTable, CButton, CBadge, CCollapse, CCardBody } from '@coreui/react-pro'
// import bar from '../baselayout/bar.scss'

import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react"
import axios from 'axios';

function BangTienDo() {
    const [province, setProvince] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/provinces')
            .then(response => {
                const province = response.data
                setProvince(province)
            })
    }, [])
    const keys = (province)
    console.log(keys)

    const [details, setDetails] = useState([])
    
    const getBadge = (status) => {
        switch (status) {
            case 'Active':
                return 'success'
            case 'Inactive':
                return 'secondary'
            case 'Pending':
                return 'warning'
            case 'Banned':
                return 'danger'
            default:
                return 'primary'
        }
    }
    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }
    
    return (
        <div >
            <br></br>
            <br></br>
            <CSmartTable
                activePage={3}
                cleaner
                clickableRows
                // columns={columns}
                columnFilter
                columnSorter
                items={keys}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedColumns={{
                    status: (item) => (
                        <td>
                            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                        </td>
                    ),
                    show_details: (item) => {
                        return (
                            <td className="py-2">
                                <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={() => {
                                        toggleDetails(item._id)
                                    }}
                                >
                                    {details.includes(item._id) ? 'Hide' : 'Show'}
                                </CButton>
                            </td>
                        )
                    },
                    details: (item) => {
                        return (
                            <CCollapse visible={details.includes(item._id)}>
                                <CCardBody>
                                    <h4>{item.username}</h4>
                                    <p className="text-muted">User since: {item.registered}</p>
                                    <CButton size="sm" color="info">
                                        User Settings
                                    </CButton>
                                    <CButton size="sm" color="danger" className="ml-1">
                                        Delete
                                    </CButton>
                                </CCardBody>
                            </CCollapse>
                        )
                    },
                }}
                selectable
                sorterValue={{ column: 'name', state: 'asc' }}
                tableFilter
                tableHeadProps={{
                    color: 'danger',
                }}
                tableProps={{
                    striped: true,
                    hover: true,
                }}
            />
            {/* <CSmartTable
                items={province}
                columnFilter
                columnSorter
                pagination
                tableProps={{
                    hover: true,
                }}
            /> */}
        </div >

    )
}


export default BangTienDo