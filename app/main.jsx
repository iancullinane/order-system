
import React, { Component } from 'react';
import ReactDOM from 'react-dom';



import NavBar from 'components/navbar';
import FullWidthGrid from 'components/body';


class PestoApp extends Component {

    constructor(props){
        super(props);
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
                <FullWidthGrid />
            </div>            
        )
    }
}

export default PestoApp;