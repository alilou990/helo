import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Nav extends Component {
    render() {
        const {location} = this.props
        return (
            <div>
                {location.pathname === '/'
                    ? 
                    <div></div>
                    :
                    <div>
                        <div>
                            <img src={this.props.profile_pic} alt='profile pic'/>
                            <h1>{this.props.username}</h1>
                        </div>
                        <Link to='/dashboard'><button>Home</button></Link>
                        <Link to='/new'><button>New Post</button></Link>
                        <Link to='/'><button>Logout</button></Link>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        username: reduxState.username,
        profile_pic: reduxState.profile_pic
    }
}

export default withRouter(connect(mapStateToProps)(Nav));