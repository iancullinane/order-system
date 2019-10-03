// react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// vendors
import { CookiesProvider } from 'react-cookie';
import Typography from '@material-ui/core/Typography';

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
        }

        // TODO::thread url tokens for page generation
        console.log(props.urlTokens)
        console.log("Launch pesto app");
    }

    async componentDidMount() {
        const authorized = await awsUser.GetSession()
        this.setState({authorized})
    }

    render(){
        
        // window.localStorage.clear();
        // let loggedIn = awsUser.GetSession();
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

export default PestoApp;


  

