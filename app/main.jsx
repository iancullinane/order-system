// react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// vendors
import Typography from 'material-ui/Typography';

// source
import NavBar from 'components/navbar';
import SignUpUser from 'utils/aws-user';
import PaperTemplate from 'components/body';
import SimpleTable from 'components/table';


class PestoApp extends Component {

    constructor(props){
        super(props);
        SignUpUser()
        // this.initialPageLoad();
    }

    // initialPageLoad(){
    //     fetch('https://qualys-tool.wbgames.com/v1/reports?account=13').then((response) => {
    //         return response.json();
    //       }).then((myBlob) => {
    //         this.setState({data: myBlob})
    //       });
    // };

    render(){
        return(
            <div>
                <NavBar /> 
                <PaperTemplate size={12}>
                    <Typography variant="headline" gutterBottom>
                        Orders Pending
                    </Typography>
                    <SimpleTable />

                </PaperTemplate>
            </div>            
        )
    }
}

export default PestoApp;