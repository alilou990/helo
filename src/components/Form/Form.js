import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios';

class Form extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            imgUrl: '',
            content: ''
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    createPost = () => {
        const {title, imgUrl, content} = this.state
        const {id} = this.props.match.params.id
        const body = {
            id,
            title, 
            imgUrl,
            content
        }
        axios.post(`/api/post/${id}`, body)
            .then(res => {
                this.props.history.push('/dashboard')
            })
    }

    render() {
        return (
            <div>
                <input 
                type='text'
                placeholder='Title'
                name='title'
                onChange={this.handleChange}
                value={this.state.title} />
                <input 
                type='url'
                placeholder='Image URL'
                name='imgUrl'
                onChange={this.handleChange}
                value={this.state.imgUrl}
                />
                <input 
                type='text'
                placeholder='Write your post here!'
                name='content'
                onChange={this.handleChange}
                value={this.state.content}
                />
                <button onClick={() => this.createPost(this.props.id)}>Post</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return{
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(Form)
