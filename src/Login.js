import React from 'react';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import {getClient} from "./callWrapper";


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.onSuccess = props.onSuccess;
        this.state = {
            username: '',
            password: '',
        };
    }

    doLogin() {
        console.log()
        getClient().login(this.state.username, this.state.password).then(this.onSuccess);
    }

    render() {
        return (<div>
                <TextField id='username' label='Username'  value={this.state.username} onChange={(event) => {
                    this.state.username = event.target.value;
                    this.setState(this.state)
                }}/> <br />
                <TextField id='password' label='Password' type='password'  value={this.state.password} onChange={(event) => {
                    this.state.password = event.target.value;
                    this.setState(this.state)
                }}/><br />
                <Button is='login-button' onClick={this.doLogin.bind(this)}> Login </Button>
            </div>
        );
    }
}