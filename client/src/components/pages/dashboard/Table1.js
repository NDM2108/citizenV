import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
// import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { CSmartTable, CButton, CBadge, CCollapse, CCardBody } from '@coreui/react-pro'
// import bar from '../baselayout/bar.scss'

import { visuallyHidden } from '@mui/utils';
import { useEffect, useState } from "react"
import axios from 'axios';

var keys

function BangTienDo() {
    // const [province, setProvince] = useState([])
    // useEffect(() => {
    //     axios.get('http://localhost:5000/provinces')
    //         .then(response => {
    //             const province = response.data
    //             setProvince(province)
    //         })
    // }, [])
    // const keys = (province)
    // console.log(keys)

    axios.get('http://localhost:5000/provinces')
            .then(response => {
                keys = response.data
            })
    console.log(keys);
    
    return (
        <CSmartTable
          items={keys}
          columnFilter
          columnSorter
          pagination
          tableProps={{
            hover: true,
          }}
        />
      )
}


export default BangTienDo