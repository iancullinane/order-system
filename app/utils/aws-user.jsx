

import { CognitoUser, CognitoIdentity, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// import AWS from 'amazon-cognito-identity-js';
// https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js

var poolData = {
    UserPoolId : 'us-east-2_kC2dLaLWV', // Your user pool id here
    ClientId : '7e4mmmj8pd57dq24hv138asn3c' // Your client id here
};



class AwsUser {
    constructor(){
        this.userPool = new CognitoUserPool(poolData);
    }

    GetSession(){
        var cognitoUser = this.userPool.getCurrentUser();


        return new Promise((resolve, reject)=>{
            if (cognitoUser != null) {
                cognitoUser.getSession(function(err, session) {
                    if (err) {
                        // alert(err.message || JSON.stringify(err));
                    }
                    console.log('session validity: ' + session.isValid());
                    if(session.isValid()){
                        resolve(true)
                    }
                    
                })
            }
        });



        if (cognitoUser != null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    // alert(err.message || JSON.stringify(err));
                }
                console.log('session validity: ' + session.isValid());
                return true;
            })
        } else {
            return true;
        };
    }

    AuthenticateUser(username, password){

        var authenticationData = {
            Username : username,
            Password : password,
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var poolData = {
            UserPoolId : 'us-east-2_kC2dLaLWV', // Your user pool id here
            ClientId : '7e4mmmj8pd57dq24hv138asn3c' // Your client id here
        };

        var userData = {
            Username : username,
            Pool : this.userPool
        };
        var cognitoUser = new CognitoUser(userData);

        return new Promise((resolve, reject)=>{
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log('access token + ' + result.getAccessToken().getJwtToken());
                    location.reload();
                },
        
                onFailure: function(err) {
                    alert(err.message || JSON.stringify(err));
                    reject(err);
                },
        
            })
        });
    }

    ConfirmUser(cognitoUser, validationCode){

        return new Promise((resolve, reject)=>{
            cognitoUser.confirmRegistration(validationCode, true, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('call result: ' + result);
            });  
        });

    }



    
    SignUpUser(email, password, address, vendor_name){
        // var userPool = new CognitoUserPool(poolData);

        var attributeList = [];
        
        var dataEmail = {
            Name : 'email',
            Value : email
        };
    
        var dataAddress = {
            Name : 'address',
            Value : address
        };
    
        var dataVendorName = {
            Name : `custom:vendor_name`,
            Value : vendor_name
        };
    
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributeAddress = new CognitoUserAttribute(dataAddress);
        var attributeVendorName = new CognitoUserAttribute(dataVendorName);
    
        
        attributeList.push(attributeEmail);
        attributeList.push(attributeAddress);
        attributeList.push(attributeVendorName);
    

        return new Promise((resolve, reject)=>{
            this.userPool.signUp(dataEmail.Value, password, attributeList, null, (err, result)=>{
                if(err){
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            });    
        });
    }
}

export let awsUser = new AwsUser();


// userPool.signUp(dataEmail.Value, password, attributeList, null, (err, result)=>{
//     return new Promise((resolve, reject)=>{
//         if (err) {
//             // alert(err.message || JSON.stringify(err));
//             reject(err);
//         }
//         return resolve({result: result.user, err: err});
//     })
    
//     // console.log('user name is ' + cognitoUser.getUsername());
    
// });
    
