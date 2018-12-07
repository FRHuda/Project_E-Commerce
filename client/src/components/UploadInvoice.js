import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closePopUp } from '../Actions';
import axios from 'axios';
import { API_URL_MYSQL } from '../Supports/api-url/apiurl';

class UploadInvoice extends Component {
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

        axios.post(`${API_URL_MYSQL}/upload/${this.props.invoice.transactionId}`, dataImage)
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })
        window.location.href = "/transaction";
    }

    handleSaveImage(e) {
        this.setState({ image: e.target.files[0] });
    }


    render() {
        return (
            <div>
                <h1>Please transfer to this Account Bank :</h1>
                <h3>0123456789</h3>


                <div className="container">
                    <form onSubmit={this.handleUploadImage}>
                        <div className="form-group">
                            <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} onChange={this.handleSaveImage} type="file" />
                        </div>

                        <button className="btn btn-success" type="submit">Upload</button>

                    </form>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    const invoice = state.invoice;

    return { invoice };
}

export default connect(mapStateToProps, { closePopUp })(UploadInvoice);