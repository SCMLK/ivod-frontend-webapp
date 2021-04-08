/**
  This react component is next to the root and the entrypoint for UI components.
  It contains the drawer, the header (AppBar), the banner and the footer.
  All other components will be imported: content of the page.
  */

import React from 'react';
import clsx from 'clsx';

/* Material UI Core */
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemSecAct from '@material-ui/core/ListItemSecondaryAction';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';

/* Material UI Icons */
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AccountCircle from "@material-ui/icons/AccountCircle";
import Dashboard from "@material-ui/icons/Dashboard";
import Group from "@material-ui/icons/Group";
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AddIcon from '@material-ui/icons/Add';

/* External installed Components*/
import SearchBar from "material-ui-search-bar";

/* Images, SVGs, etc. */
import Banner from './images/banner.png';
import IfisLogo from './images/ifis_white.svg';


/* Selfcreated Components */
import MainContent from './MainContent';
import AddChartMenu from './AddChartMenu';
import AddDashboardMenu from './AddDashboardMenu';
import AddGroupsMenu from './AddGroupsMenu';
import Footer from './components/Footer'

import {createClient} from "./callWrapper";
import Login from "./Login";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    'min-height': '100vh',
    position: 'relative',
    'padding-bottom': '60px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function doSomethingWith(value) {
  return null;
}


export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loginModalOpen, setloginModalOpen] = React.useState(false);
  let showAddBtns = false;

  const handleDrawerOpen = () => {
    showAddBtns = true;
    setOpen(true);
    console.log("Drawer opened + showAddBtns: " + showAddBtns);
  };

  const handleDrawerClose = () => {
    showAddBtns = false;
    setOpen(false);
    console.log("Drawer closed + showAddBtns: " + showAddBtns);
  };

      React.useEffect(() => {
        //Run only once on mount
        const client = createClient('https://visquid.org/');
        // FIXME: LOGIN HERE FOR DEBUGGING
    }, []);

  return (
    <div className={classes.root} id="drawer">
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
          <Toolbar>
            <SearchBar
              className="SearchBar"
              value={null}
              onChange={(newValue) => this.setState({ value: newValue })}
              onRequestSearch={() => doSomethingWith(this.state.value)}
            />
            <NotificationsIcon
              className="HeaderNotification"
            />
            <Button
              id="HeaderLoginBtn"
              variant="contained"
              color="default"
              className={classes.button}
              endIcon={<AccountCircle>login/signup</AccountCircle>}
              onClick={() => {setloginModalOpen(true);} }
            >
              login/signup
            </Button>
              <Modal
                open={loginModalOpen}
                onClose={ () => {setloginModalOpen(false)}}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <div style={{top:'30%', left:'30%',}} className={classes.paper}>
                    <Login onSuccess={() => {setloginModalOpen(false);}} />
                </div>
              </Modal>

        </Toolbar>
      <AppBar />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            IVOD - Interactive Visualization of Open Data
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Account">
              <ListItemIcon><AccountCircle /></ListItemIcon>
              <ListItemText primary="Account" />
          </ListItem>
          <ListItem button key="Charts">
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Charts"/>
              <ListItemSecAct>
                <IconButton edge="end" aria-label="add">
                  {open ? <AddIcon /> : null}
                </IconButton>
              </ListItemSecAct>
           </ListItem>
           <ListItem button key="Dashboards">
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboards"/>
              <ListItemSecAct>
                <IconButton edge="end" aria-label="add">
                  {open ? <AddIcon /> : null}
                </IconButton>
              </ListItemSecAct>
           </ListItem>
           <ListItem button key="Groups">
              <ListItemIcon><Group /></ListItemIcon>
              <ListItemText primary="Groups"/>
              <ListItemSecAct>
                <IconButton edge="end" aria-label="add">
                  {open ? <AddIcon /> : null}
                </IconButton>
              </ListItemSecAct>
           </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="Info">
              <ListItemIcon><InfoIcon /></ListItemIcon>
              <ListItemText primary="Info" />
          </ListItem>
          <ListItem button key="Help">
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Help" />
          </ListItem>
        </List>
      </Drawer>
      <div>
        <img class="banner" src={Banner} alt="Page-Banner" />
        <main className={classes.content}>
          <MainContent />
        </main>
      </div>
      <Footer/>
    </div>
  );
}
