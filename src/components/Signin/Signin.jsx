import React from "react";
import { Component } from 'react'
import "./Signin.css"

class Signin extends Component {

    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})  
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', { 
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){ // does the user exist? Did we receive a user with a property of id?
              this.props.loadUser(user);
              this.props.onRouteChange('home');
            }
        })
    }
    render() {
        const { onRouteChange} = this.props;
        return (
            <div className="center Signin">
                    <div className="forms">
                    <p className="form-title">Sign in to your account</p>
                    <div className="input-container">
                        <input onChange={this.onEmailChange} placeholder="Enter email" type="email"/>
                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="input-container">
                        <input onChange={this.onPasswordChange} placeholder="Enter password" type="password"/>

                        <span>
                            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                            </svg>
                        </span>
                        </div>
                        <button className="submit" type="submit" onClick={this.onSubmitSignIn}>
                            Sign in
                        </button>

                    <p className="signup-link">
                        No account?
                        <br/><span onClick={() => this.props.onRouteChange('register')} style={{cursor: 'pointer'}}>Sign up</span>
                    </p>
                </div>

            </div>
        );
    }
  
} 

export default Signin;