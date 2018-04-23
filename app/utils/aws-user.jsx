

import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

// https://github.com/aws/aws-amplify/tree/master/packages/amazon-cognito-identity-js

var poolData = {
    UserPoolId : 'us-east-2_SqPWkjFhx', // Your user pool id here
    ClientId : '5e86924ighs70itck1816rajbi' // Your client id here
};
var userPool = new CognitoUserPool(poolData);

var attributeList = [];

var dataEmail = {
    Name : 'email',
    Value : 'email@mydomain.com'
};

var dataPhoneNumber = {
    Name : 'phone_number',
    Value : '+15555555555'
};
var attributeEmail = new CognitoUserAttribute(dataEmail);
var attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);

attributeList.push(attributeEmail);
attributeList.push(attributePhoneNumber);


export default function SignUpUser(){
    userPool.signUp(dataEmail.Value, '!Password1', attributeList, null, function(err, result){
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });

}
