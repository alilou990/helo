import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {userInfo} from '../../redux/reducer'

import './Auth.css'

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = () => {
        const {username, password} = this.state
        const body = {
            username,
            password
        }
        axios.post('/auth', body)
            .then(res => {
                this.props.userInfo(res.data)
                this.props.history.push('/dashboard')
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    login = (req, res) => {
        const {username, password} = this.state
        const body = {
            username,
            password
        }
        axios.post('/auth/login', body)
            .then(res => {
                this.props.userInfo(res.data)
                this.props.history.push('/dashboard')
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='auth-container'>
               <div className='input-card'>
                   <h1>HELO</h1>
                    <div className='inputs'>
                        <label>Username:</label>
                        <input 
                            type='text' 
                            name='username' 
                            onChange={this.handleChange} 
                            value={this.state.username} />
                    </div> 
                    <div className='inputs'>
                        <label>Password:</label>
                        <input 
                            type='password' 
                            name='password' 
                            onChange={this.handleChange} 
                            value={this.state.password}/>
                    </div> 
                    <div className='btn'>
                        <button onClick={() => this.login()}>Login</button>
                        <button onClick={() => this.register()}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {userInfo})(Auth)