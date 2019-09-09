import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios';
// import Post from '../Post/Post'


class Dash extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            myPosts: true,
            allPosts: [],

        }
    }

    componentDidMount(){
        this.getAllPosts()
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleToggle = () => {
        this.setState({
            myPosts: !this.state.myPosts
        })
        
    }

    getUser = () => {
        if(!this.props.id){

        }
    }

    searchPosts = () => {
        axios.get(`/api/posts/${this.props.id}?title=${this.state.search}&user=${!this.state.myPosts}`)
            .then(res => {
                this.setState({
                    allPosts: res.data
                })
                
            })
        .catch(error => {
            console.log(error)
        })
    }
    
    getAllPosts = () => {
        axios.get(`/api/posts`)
            .then(res => {
                this.setState({
                    ...this.state.allPosts,
                    allPosts: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        // console.log(this.state.allPosts)
        let mappedPosts = this.state.allPosts.map((post, i) => (
               <Link to={`/post/${post.id}`}> 
                    {/* <Post key={i} post={post}/>  */}
                    <div>
                    <p>{post.title}</p>
                    <p>{post.username}</p>
                    <img src={post.profile_pic} alt='profile pic'/>
                </div>

               </Link>
        )) 
        return (
            <div>
                <input 
                    type='text' 
                    placeholder='Search by Title' 
                    onChange={this.handleChange} 
                    name='search'
                    value={this.state.search} />
                <button 
                    onClick={this.searchPosts}>Search</button>
                <button>Reset</button>
                <label>My Posts</label>
                <input 
                    type='checkbox' 
                    onClick={this.handleToggle}
                    value={this.state.myPosts}
                    defaultChecked/>
                    
                <div>
                    {mappedPosts}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id
    }
}

export default connect(mapStateToProps)(Dash)