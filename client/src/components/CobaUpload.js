import React, { Component } from 'react';
import axios from 'axios';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';

class CobaUpload extends Component {
    constructor(props) {
        super(props);
        this.handleSaveImage = this.handleSaveImage.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    }
    state = { image: null, uploadStatus: false }


    handleUploadImage(e) {
        e.preventDefault();
        const dataImage = new FormData();

        dataImage.append('file', this.state.image);
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // };

        axios.post(`${API_URL_MYSQL}/upload`, dataImage)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSaveImage(e) {
        this.setState({ image: e.target.files[0] });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleUploadImage}>
                    <div className="form-group">
                        <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleSaveImage} type="file" />
                    </div>

                    <button className="btn btn-success" type="submit">Upload</button>

                </form>
            </div>
        )
    }
}


export default CobaUpload;