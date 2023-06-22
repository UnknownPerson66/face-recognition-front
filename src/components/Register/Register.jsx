import React from "react"
import { Component } from 'react'
import "./Register.css"

class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})  
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})  
    }

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', { 
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user){
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    }

    render() {
        
        return (
        <div className="center Register">
                <div className="forms">
                    <p className="form-title">Register your account</p>
                    <div className="input-container">
                        <input onChange={this.onNameChange} placeholder="Enter your name" type="text"/>
                    </div>
                    <div className="input-container">
                        <input onChange={this.onEmailChange} placeholder="Enter email" type="email"/>
                    </div>
                    <div className="input-container">
                        <input onChange={this.onPasswordChange} placeholder="Enter password" type="password"/>
                    </div>
                    <button className="submit" type="submit" onClick={this.onSubmitRegister}>
                    Register
                    </button>

                    <p className="signin-link">
                        Already have a account?
                        <br/><span onClick={() => this.props.onRouteChange('signin')} style={{cursor: 'pointer'}}>Sign In</span>
                    </p>
    
                </div>
        </div>
        );
    }
}

export default Register;