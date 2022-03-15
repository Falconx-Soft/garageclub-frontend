import './nav.css';
import React from 'react';
import 'reactjs-popup/dist/index.css';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SideBar from './sideBar.png';
import SideBarLogo from './sideBarLogo.png';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Nav(props) {
	const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const searchIcion = document.getElementById("searchIconsh");
  if(searchIcion != null){
    searchIcion.addEventListener("click",function(){
      if (document.getElementById("search-div").classList.contains("showDiv")){
        document.getElementById("search-div").classList.remove("showDiv");
        document.getElementById("search-div").classList.add("hideDiv");
      }else{
        document.getElementById("search-div").classList.add("showDiv");
        document.getElementById("search-div").classList.remove("hideDiv");
      }
    })
  }

  function handleChange(event) {
    const m = event.target.value;
    let hold = []
    if(m===""){
        props.setTemp(props.validation);
    }else{
      props.validation.map((c) => {
            var re = new RegExp(m, 'i');
            if(c && c.reference.match(re)){
                hold.push(c);
            }else if(c && c.model.match(re)){
                hold.push(c);
            }
        })
        props.setTemp(hold);
    }
  }

  return (
	<>
    <div className="nav-div">
		<div className="nav-div-left">
			<i className="fas fa-bars" onClick={handleDrawerOpen}></i>
	  		<p className="title">Todas Las Valoranions</p>
		</div>
		<div className="nav-div-right-btn">
			<i className="fas fa-search" id="searchIconsh"></i>
		</div>
    </div>
	<Drawer
		sx={{
		width: drawerWidth,
		flexShrink: 0,
		'& .MuiDrawer-paper': {
			width: drawerWidth,
			boxSizing: 'border-box',
		},
		}}
		variant="persistent"
		anchor="left"
		open={open}
		className='sidebar'
	>
		<DrawerHeader className='sidebar'>

		<IconButton onClick={handleDrawerClose}>
			{/* <p className="sidebarHeading">GARAGE Club</p> */}
      <img src={SideBarLogo}></img>
			{theme.direction === 'ltr' ? <CloseIcon /> : <ChevronRightIcon />}
		</IconButton>
		</DrawerHeader>
		<List className='sidebarlistdiv'>
			<ListItem button key={"Valoraciones"}>
			<ListItemIcon>
				<img src={SideBar}></img>
			</ListItemIcon>
			<ListItemText className='sidebarList' primary={"Valoraciones"} />
			</ListItem>
		</List>
		
	</Drawer>
  <div className="search-div hideDiv" id="search-div">
    <input className="search-input" onChange={handleChange} placeholder="Search..."></input>
  </div>
	</>
  );
}