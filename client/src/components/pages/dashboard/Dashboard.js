import * as React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./listItems";
import PopulationDeclaration from "../populationDeclaration/PopulationDeclaration";
import DataProvinces from "./DataProvinces";
import DataPopulations from "./DataPopulations";
import Analysis from "../analysis/Analysis";
import AddAccount from "../addAccount/AddAccount";
import AccountManager from "../accountManager/AccountManager";
import InfoPopulation from "../population/InfoPopulation";
import { useNavigate } from "react-router-dom";
import EditAccount from "../accountManager/editAccount/EditAccount";
import AddCode from "../addCode/AddCode";
import UpdateStatus from "../updateStatus/UpdateStatus";
import Footer from "./Footer";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // boxSizing: 'border-box',
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
<<<<<<< HEAD
    const addressAccount = localStorage.getItem('address')
    const levelAccount = localStorage.getItem('level')
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const logOut = async () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        
        <ThemeProvider theme={mdTheme}>
            <div>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <img
                                // className="accountUpdateImg"
                                style={{ width: '50px', height: '50px', marginRight: '20px' }}
                                src="https://www.gso.gov.vn/wp-content/uploads/2021/01/gso_logo.png"
                                alt=""
                            />
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                T???NG C???C D??N S???
                            </Typography>
=======
  const addressAccount = localStorage.getItem("address");
  const levelAccount = localStorage.getItem("level");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
>>>>>>> c58fc9e61d82c7c1e4db9f8ebc000591543e294d

  const logOut = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <img
                // className="accountUpdateImg"
                style={{ width: "50px", height: "50px", marginRight: "20px" }}
                src="https://www.gso.gov.vn/wp-content/uploads/2021/01/gso_logo.png"
                alt=""
              />
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                T???NG C???C TH???NG K??
              </Typography>

              <IconButton color="inherit">
                <span style={{ fontSize: "15px" }}>
                  {levelAccount} : {addressAccount}
                </span>
                <Badge color="secondary">
                  <AccountBoxIcon />
                </Badge>
              </IconButton>

              <IconButton onClick={() => logOut()} style={{}} color="inherit">
                <span style={{ fontSize: "15px" }}>????ng xu???t</span>
                <Badge color="secondary">
                  <ExitToAppIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              <MainListItems />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "90.85vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <div>
              <>
                <Routes>
                  <Route path="/admin" element={<DataProvinces />} />
                  <Route path="/TimeTable" element={<DataProvinces />} />
                  <Route path="/chart" element={<Analysis />} />
                  <Route path="/accMan" element={<AccountManager />} />
                  <Route path="/addCode" element={<AddCode />} />
                  <Route path="/accMan/:accountID" element={<EditAccount />} />
                  <Route
                    path="/accMan/update/:accountID"
                    element={<UpdateStatus />}
                  />
                  <Route path="/addaccount" element={<AddAccount />} />
                  <Route path="/population" element={<DataPopulations />} />
                  <Route
                    path="/population/:personID"
                    element={<InfoPopulation />}
                  />
                  <Route
                    path="/declaration"
                    element={<PopulationDeclaration />}
                  />
                </Routes>
                <Outlet />
              </>
            </div>
          </Box>
        </Box>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
