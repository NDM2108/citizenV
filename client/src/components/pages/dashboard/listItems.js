import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import "./listItems.css";
import { Outlet, Link } from "react-router-dom";


const ListItemData = [
  {
    title: "Home",
    path: "/home",
    icon: <DashboardIcon />,
    cName: "nav-text",
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <PeopleIcon />,
    cName: "nav-text",
  },
  {
    title: "Accounts",
    path: "/accounts",
    icon: <BarChartIcon />,
    cName: "nav-text",
  },

  {
    title: "Population",
    path: "/population",
    icon: <AssignmentIcon />,
    cName: "nav-text",
  },
];

export const mainListItems = (
  <div>
    <Link to = '/TimeTable' style = {{textDecoration: 'none', color: 'black'}}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Bảng điều khiển" />
      </ListItem>
    </Link>
    
    
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý tài khoản" />
    </ListItem>
    
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Thống kê" />
    </ListItem>

    <Link to = '/declaration' style = {{textDecoration: 'none', color: 'black'}} >
    <ListItem button>
    {/* <ListItem button onClick={(e) => {e.preventDefault(); window.location.href='./declaration'}}> */}
        <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Khai báo" />
    </ListItem>
    </Link>

    <Outlet />


   
    

  </div>
);
