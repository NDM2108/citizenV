import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
// import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { CSmartTable, CButton, CBadge, CCollapse, CCardBody } from '@coreui/react-pro'
// import bar from '../baselayout/bar.scss'

import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react"
import axios from 'axios';

function BangTienDo() {
    const users = [
        {
            "id": 0,
            "date_sent": "2022-04-05",
            "city": "Lake Ofeliafurt",
            "status": 0
        },
        {
            "id": 1,
            "date_sent": "2022-06-13",
            "city": "Baytown",
            "status": 2
        },
        {
            "id": 2,
            "date_sent": "2022-04-26",
            "city": "North Karen",
            "status": 1
        },
        {
            "id": 3,
            "date_sent": "2021-06-26",
            "city": "Lake Trudiechester",
            "status": 1
        },
        {
            "id": 4,
            "date_sent": "2021-02-17",
            "city": "North Laurynmouth",
            "status": 0
        },
        {
            "id": 5,
            "date_sent": "2021-06-10",
            "city": "New Treverfort",
            "status": 2
        },
        {
            "id": 6,
            "date_sent": "2021-04-26",
            "city": "West Elenoraborough",
            "status": 0
        },
        {
            "id": 7,
            "date_sent": "2022-04-17",
            "city": "West Paigehaven",
            "status": 2
        },
        {
            "id": 8,
            "date_sent": "2022-08-21",
            "city": "Tylerside",
            "status": 2
        },
        {
            "id": 9,
            "date_sent": "2022-05-04",
            "city": "South Candelarioberg",
            "status": 2
        },
        {
            "id": 10,
            "date_sent": "2021-09-03",
            "city": "Midland",
            "status": 1
        },
        {
            "id": 11,
            "date_sent": "2022-06-09",
            "city": "Viviennechester",
            "status": 0
        },
        {
            "id": 12,
            "date_sent": "2021-09-16",
            "city": "Stokeshaven",
            "status": 0
        },
        {
            "id": 13,
            "date_sent": "2021-01-06",
            "city": "East Justen",
            "status": 0
        },
        {
            "id": 14,
            "date_sent": "2022-03-04",
            "city": "Lake Abelmouth",
            "status": 0
        },
        {
            "id": 15,
            "date_sent": "2021-05-01",
            "city": "West Roosevelt",
            "status": 2
        },
        {
            "id": 16,
            "date_sent": "2022-10-05",
            "city": "Buckland",
            "status": 0
        },
        {
            "id": 17,
            "date_sent": "2022-09-10",
            "city": "North Kaelaview",
            "status": 2
        },
        {
            "id": 18,
            "date_sent": "2021-08-18",
            "city": "Costa Mesa",
            "status": 0
        },
        {
            "id": 19,
            "date_sent": "2021-08-09",
            "city": "Aaliyahmouth",
            "status": 0
        },
        {
            "id": 20,
            "date_sent": "2021-12-09",
            "city": "Lake Wallace",
            "status": 1
        },
        {
            "id": 21,
            "date_sent": "2022-08-09",
            "city": "West Anjalistad",
            "status": 1
        },
        {
            "id": 22,
            "date_sent": "2022-06-05",
            "city": "Rustyfort",
            "status": 2
        },
        {
            "id": 23,
            "date_sent": "2021-04-22",
            "city": "Roswell",
            "status": 0
        },
        {
            "id": 24,
            "date_sent": "2021-07-25",
            "city": "High Point",
            "status": 2
        },
        {
            "id": 25,
            "date_sent": "2022-06-03",
            "city": "West Haleigh",
            "status": 1
        },
        {
            "id": 26,
            "date_sent": "2021-08-06",
            "city": "Halvorsonchester",
            "status": 1
        },
        {
            "id": 27,
            "date_sent": "2021-07-13",
            "city": "Lake Tomasa",
            "status": 0
        }
    ]
    const [province, setProvince] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/province')
            .then(response => {
                const province = response.data
                setProvince(province)
            })
    }, [])
    const keys = (province)
    console.log(typeof keys)

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
                items={users}
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