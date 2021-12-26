import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./listItems.css";
import { Outlet, Link } from "react-router-dom";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Navigate, useNavigate } from "react-router-dom";



export default function MainListItems() {
  const navigate = useNavigate();
  const levelAccount = localStorage.getItem('level')
  console.log(levelAccount);
  const statusAccount = localStorage.getItem('status')
  console.log(statusAccount);

  const handleClickDeclaration = e => {
      e.preventDefault();
      if(statusAccount == 'Inactive'){
        alert('Bạn chưa được cấp quyền khai báo')
      }else{
        navigate('/declaration')
      }
  }
  
  const handleClickAccMan = e =>{
    e.preventDefault()
    if(levelAccount == 'B2'){
      alert('Bạn không có quyền quản lý tài khoản')
    }else{
      navigate('/accMan')
    }

  }

  const handleClickAddCode = e =>{
    e.preventDefault()
    if(levelAccount == 'B2'){
      alert('Bạn không có quyền cấp mã')
    }else{
      navigate('/addCode')
    }

  }
  const handleClickAddAccount = e =>{
    e.preventDefault()
    if(levelAccount == 'B2'){
      alert('Bạn không có quyền cấp tài khoản')
    }else{
      navigate('/addaccount')
    }

  }

  return(
    <div>
      <Link to='/TimeTable' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Bảng điều khiển" />
        </ListItem>
      </Link>

      <Link to='/accMan' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button onClick={handleClickAccMan}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Quản lý tài khoản" />
        </ListItem>
      </Link>

      <Link to='/addCode' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button onClick={handleClickAddCode}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Cấp mã" />
        </ListItem>
      </Link>

      <Link to='/addaccount' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button onClick={handleClickAddAccount}>
          <ListItemIcon>
            <PersonAddAltIcon />
          </ListItemIcon>
          <ListItemText primary="Cấp tài khoản" />
        </ListItem>
      </Link>

      <Link to='/population' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Thông tin người dân" />
        </ListItem>
      </Link>

      <Link to='/chart' style={{ textDecoration: 'none', color: 'black' }}>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Phân tích" />
        </ListItem>
      </Link>

      <Link to='/declaration' style={{ textDecoration: 'none', color: 'black' }} >
        <ListItem button onClick={handleClickDeclaration}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Khai báo" />
        </ListItem>
      </Link>

      <Outlet />

    </div>
  )
};


