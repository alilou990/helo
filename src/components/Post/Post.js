import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios';

export default class Post extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    getPost = () => {
        const {postid} = this.props.match.params
        axios.get(`/api/post/${postid}`)
            .then(res => {
                const {title, img, content, username, profile_pic} = res.data[0]
                this.setState({
                    title,
                    img,
                    content,
                    username,
                    profile_pic
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {title, img, content, username, profile_pic} = this.state
        return (
            <div>
                <div>
                    <p>{title}</p>
                    <img src={img} alt='post pic' />
                    <p>{content}</p>
                    <p>{username}</p>
                    <img src={profile_pic} alt='profile pic'/>
                </div>
            </div>
        )
    }
}
