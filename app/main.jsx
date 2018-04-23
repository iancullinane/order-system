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
import LoginBox from 'components/auth/login';
import SimpleTable from 'components/table';


class PestoApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            authorized: this.checkAuth()
        }

        

        // if(this.props.urlTokens && this.props.urlTokens[0]){
        //     this.routeRequestToData(this.props.urlTokens);
        //     return
        // }


        // SignUpUser()
        // this.initialPageLoad();
    }

    checkAuth(){
        let check = localStorage.getItem("authed");
        console.log(check);
        if(check === null){
            return false;
        }

        return true;
    }
    // /**
    // * Route to a view based on urlTokens
    // *
    // * @param {list} urlTokens tokenized list of the current url path
    // */
    // routeRequestToData(urlTokens){
    //     let endpoint = utils.generateApiEndpoint(urlTokens, account.currentAccount.id);
    //     const pathToFunctionMap = {
    //         'login':		 () => { console.log(`reource: ${urlTokens[1]}`)  },
    //         'main_page':	 () => { console.log(`reource: ${urlTokens[1]}`)  },

    //     }	
        
    //     try {	
    //         pathToFunctionMap[urlTokens[0]]();
    //     } catch(err) { console.log(err); }
    // }

    render(){


        return(            
            <div>
                <NavBar /> 
                {this.state.authorized
                    ? <SimpleTable />
                    : <LoginBox />
                }
            </div>
        )
    }
}

export default PestoApp;


  

