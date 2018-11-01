import React, { Component } from 'react';
import { connect } from'react-redux';

class Admin extends Component {


    renderAdmin = () => {
        if (this.props.auth.statusId === 1) {
            return (
                <div>
                    <h1>Welcome to Admin Page</h1>

                    <div className="sidenav" style={{marginTop:"60px"}}>
                        <a href="/admin/add">Add Product</a>
                        <a href="#services">Update Product</a>
                        <a href="#clients">Delete Product</a>
                        <a href="#contact">History Product</a>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    
                </div>
            )
        }
    }


    render() {
        return this.renderAdmin();
    }
}

const mapStateToProps = (state) =>{
    const auth = state.auth;

    return { auth };
}

export default connect(mapStateToProps)(Admin);