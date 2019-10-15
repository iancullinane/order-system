// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';


// react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// vendors
import { CookiesProvider } from 'react-cookie';


import { makeStyles, withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// source
import NavBar from 'components/navbar';
import SignUpUser from 'utils/aws-user';
import PaperTemplate from 'components/body';
import LoginPage from 'components/pages/auth-page';
import MainPage from 'components/pages/main-page';


// import "components/styles/styles.scss"
import { awsUser } from 'utils/aws-user';

// Assets
import BackGround from "./assets/funky-lines.png"

// const useStyles = makeStyles(theme => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   }));

const styles = theme => ({
    root: {
        height: "100%",
        background: `url(${BackGround})`,
        backgroundRepeat: "repeat",
        // padding: theme.spacing.unit,
      },
    body: {
        marginTop: "75px",
        height: "100%",
        [theme.breakpoints.down('sm')]: {
          width: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: "80%",
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%",
        },
        [theme.breakpoints.up('xl')]: {
            width: "50%",
        },
      },
  });

class PestoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            session: null,
            authorized: true
        }

        // TODO::thread url tokens for page generation
        console.log(props.urlTokens)
        console.log("Launch pesto app");
    }

    

    // async componentDidMount() {
    //     const authorized = await awsUser.GetSession()
    //     this.setState({authorized})
    // }

    render(){
        const { classes } = this.props;

        return(            
            <div id={"root"}>
                <NavBar />
                {this.state.authorized
                    ? <MainPage />
                    : <LoginPage /> 
                }
                
            </div>
        )
    }
}




  

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
export default withStyles(styles)(PestoApp);
