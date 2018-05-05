// react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// vendors
import { CookiesProvider } from 'react-cookie';
import Typography from 'material-ui/Typography';

// source
import NavBar from 'components/navbar';
import SignUpUser from 'utils/aws-user';
import PaperTemplate from 'components/body';
import LoginPage from 'components/auth/page';
// import SimpleTable from 'components/table';
import OrderPage from 'components/order/page';


import "components/styles/styles.scss"
import { awsUser } from 'utils/aws-user';



class PestoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            session: null,
        }
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
                    ? <OrderPage />
                    : <LoginPage /> 
                }
                
            </div>
        )
    }
}

export default PestoApp;


  

