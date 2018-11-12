import React, { Component } from 'react';
import { API_URL_MONGODB, API_URL_MYSQL } from '../Supports/api-url/apiurl';
import axios from 'axios';
import TransactionAdmin from './TransactionAdmin';


class AdminPage extends Component {
    state = { active: 0, user: [], category: [], subcategory: [], product: [], brand: [], jabatan: [], transaction: [], edit: 0, editBrand: 0, temp: 1, addtemp: 1, tempCat: 1, tempSub: 1, tempBrand: 1, addCat: 1, addSub: 1, addBrand: 1 };

    componentWillMount() {
        axios.get(`${API_URL_MYSQL}/admin/akun`)
            .then(user => {
                this.setState({ user: user.data });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/admin/product`)
            .then(product => {
                var tampung = product.data;
                tampung.sort(function (a, b) {
                    return b.Id - a.Id;
                })
                this.setState({ product: tampung });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/admin/category`)
            .then(category => {
                this.setState({ category: category.data });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/admin/subcategory`)
            .then(subcategory => {
                var tampung = subcategory.data;
                tampung.sort(function (a, b) {
                    return a.CategoryId - b.CategoryId;
                })
                this.setState({ subcategory: tampung });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/admin/brand`)
            .then(brand => {
                this.setState({ brand: brand.data });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MYSQL}/admin/jabatan`)
            .then(jabatan => {
                this.setState({ jabatan: jabatan.data });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get(`${API_URL_MONGODB}/alltransaction`)
            .then(transaction => {
                this.setState({ transaction: transaction.data });
            })
            .catch(err => {
                console.log(err);
            })
    }


    //OTHER FUNCTION
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    //USER TAB FUNCTION

    UpdateStatus = (id) => {
        if (window.confirm('Are you sure want to update ?')) {
            axios.put(`${API_URL_MYSQL}/userstatus/${id}`, {
                StatusId: this.state.temp
            })
                .then(user => {
                    this.setState({ user: user.data });
                    alert('Update Status User Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({ edit: 0, editBrand: 0, temp: 1 })
    }

    deleteUser = (id) => {
        if (window.confirm('Are you sure want to delete this user ?')) {
            axios.delete(`${API_URL_MYSQL}/user/${id}`)
                .then(user => {
                    this.setState({ user: user.data });
                    alert('Delete User Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    //CATEGORY TAB FUNCTION

    AddSubcategory = () => {
        if (this.refs.addsubcategory.value === '') {
            alert('Please fill the name first');
            return;
        }

        if (window.confirm('Are you sure want to add Sub Category ?')) {
            axios.post(`${API_URL_MYSQL}/subcategory`, {
                Name: this.refs.addsubcategory.value,
                CategoryId: this.state.addtemp
            })
                .then(subcategory => {
                    this.setState({ subcategory: subcategory.data });
                    alert('Add Sub Category Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({ edit: 0, editBrand: 0, addtemp: 1 });
    }

    UpdateSubcategory = (id) => {
        if (this.refs.subcategoryname.value === '') {
            alert('Please fill the name first');
            return;
        }

        if (window.confirm('Are you sure want to update ?')) {
            axios.put(`${API_URL_MYSQL}/subcategory/${id}`, {
                Name: this.refs.subcategoryname.value,
                CategoryId: this.state.temp
            })
                .then(subcategory => {
                    this.setState({ subcategory: subcategory.data });
                    alert('Update Sub Category Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({ edit: 0, editBrand: 0, temp: 1 });
    }

    deleteSubcategory = (id) => {
        if (window.confirm('Are you sure want to delete this Sub Category ?')) {
            axios.delete(`${API_URL_MYSQL}/subcategory/${id}`)
                .then(subcategory => {
                    this.setState({ subcategory: subcategory.data });
                    alert('Delete Sub Category Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    //BRAND TAB FUNTION

    UpdateBrand = (id) => {
        if (this.refs.brandname.value === '') {
            alert('Please fill the name');
            return;
        }

        if (window.confirm('Are you sure wnat to update this brand ?')) {
            axios.put(`${API_URL_MYSQL}/brand/${id}`, {
                Name: this.refs.brandname.value
            })
                .then(brand => {
                    this.setState({ brand: brand.data });
                })
                .catch(err => {
                    console.log(err);
                })
        }
        alert('Update Brand Success');
        this.setState({ editBrand: 0 })
    }
    AddBrand = () => {
        if (this.refs.addbrandname.value === '') {
            alert('Please fill the name');
            return;
        }
        if (window.confirm('Are you sure want to add this brand ?')) {
            axios.post(`${API_URL_MYSQL}/brand`, {
                Name: this.refs.addbrandname.value
            })
                .then(brand => {
                    this.setState({ brand: brand.data });
                    alert('Add Brand Success');
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }
    deleteBrand = (id) => {
        if (window.confirm('Are you sure want to delete this brand ?')) {
            axios.delete(`${API_URL_MYSQL}/brand/${id}`)
                .then(brand => {
                    this.setState({ brand: brand.data });
                    alert('Delete Brand Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    //PRODUCT TAB FUNCTION

    UpdateProduct = (id) => {
        if (this.refs.productname.value === '' || this.refs.productimage.value === '' || this.refs.productprice.value === '') {
            alert('Please fill the whole form first');
            return;
        }

        if (window.confirm('Are you sure want to update this Product ?')) {
            axios.put(`${API_URL_MYSQL}/product/${id}`, {
                Name: this.refs.productname.value,
                CategoryId: this.state.tempCat,
                SubCategoryId: this.state.tempSub,
                Brand: this.state.tempBrand,
                Description: this.refs.productdescription.value,
                Img: this.refs.productimage.value,
                Price: this.refs.productprice.value
            })
                .then(product => {
                    this.setState({ product: product.data });
                    alert('Update Product Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({ edit: 0, editBrand: 0, tempCat: 1, tempSub: 1, tempBrand: 1 });
    }

    AddProduct = () => {
        if (this.refs.addproductname.value === '' || this.refs.addproductimage.value === '' || this.refs.addproductprice.value === '') {
            alert('Please fill the whole form first');
            return;
        }

        if (window.confirm('Are you sure want to add this Product ?')) {
            axios.post(`${API_URL_MYSQL}/product`, {
                Name: this.refs.addproductname.value,
                CategoryId: this.state.addCat,
                SubCategoryId: this.state.addSub,
                Brand: this.state.addBrand,
                Description: this.refs.addproductdescription.value,
                Img: this.refs.addproductimage.value,
                Price: this.refs.addproductprice.value
            })
                .then(product => {
                    this.setState({ product: product.data });
                    alert('Update Product Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({ edit: 0, editBrand: 0, addCat: 1, addSub: 1, addBrand: 1 });
    }

    deleteProduct = (id) => {
        if (window.confirm('Are you sure want to delete this product ?')) {
            axios.delete(`${API_URL_MYSQL}/product/${id}`)
                .then(product => {
                    this.setState({ product: product.data })
                    alert('Delete product Success');
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    //RENDER FUNCTION

    renderUser = () => {
        return this.state.user.map((user, index) => {
            var jabatan = [];
            this.state.jabatan.map(item => {
                jabatan.push(item.Nama);
            })

            if (this.state.edit === user.Id) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{user.Email}</td>
                        <td>{user.Username}</td>
                        <td>{user.Phone}</td>
                        <td>{user.Birthday}</td>
                        <td>
                            <select>
                                {this.state.jabatan.map(item => {
                                    return (
                                        <option onClick={() => this.setState({ temp: item.Id })}>{item.Nama}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <input type="button" className="btn btn-success" value="Update" onClick={() => this.UpdateStatus(user.Id)} />
                        </td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{user.Email}</td>
                    <td>{user.Username}</td>
                    <td>{user.Phone}</td>
                    <td>{user.Birthday}</td>
                    <td>{jabatan[user.StatusId - 1]}</td>
                    <td className="d-flex justify-content-between">
                        <input type="button" className="btn btn-secondary" value="Edit Status" onClick={() => this.setState({ edit: user.Id })} />
                        <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.deleteUser(user.Id)} />
                    </td>
                </tr>
            )
        })
    }

    renderCategory = () => {
        return this.state.subcategory.map((subcategory, index) => {
            var category = [];
            this.state.category.map(item => {
                category.push(item.Name);
            })


            if (this.state.edit === subcategory.Id) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="text" ref="subcategoryname" defaultValue={subcategory.Name} style={{ backgroundColor: "white" }} /></td>
                        <td>
                            <select>
                                {this.state.category.map(category => {
                                    return (
                                        <option onClick={() => this.setState({ temp: category.Id })}>{category.Name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td className="d-flex justify-content-between">
                            <input type="button" className="btn btn-success" value="Update" onClick={() => this.UpdateSubcategory(subcategory.Id)} />
                        </td>
                    </tr>
                )
            }
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{subcategory.Name}</td>
                    <td>{category[subcategory.CategoryId - 1]}</td>
                    <td className="d-flex justify-content-between">
                        <input type="button" className="btn btn-secondary" value="Edit" onClick={() => this.setState({ edit: subcategory.Id })} />
                        <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.deleteSubcategory(subcategory.Id)} />
                    </td>
                </tr>
            )
        })
    }

    renderBrand = () => {
        return (
            <table style={{ width: "50%" }}>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Edit</th>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="text" ref="addbrandname" style={{ backgroundColor: "white" }} /></td>
                    <td><input type="button" value="Add" className="btn btn-success" onClick={this.AddBrand} /></td>
                </tr>
                {this.renderBrandDetail()}
            </table>
        )
    }
    renderBrandDetail = () => {
        return this.state.brand.map((brand, index) => {

            if (this.state.editBrand === brand.Id) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="text" ref="brandname" defaultValue={brand.Name} style={{ backgroundColor: "white" }} /></td>
                        <td>
                            <input type="button" className="btn btn-success" value="Update" onClick={() => this.UpdateBrand(brand.Id)} />
                        </td>
                    </tr>
                )
            }

            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{brand.Name}</td>
                    <td>
                        <input type="button" className="btn btn-secondary" value="Edit" onClick={() => this.setState({ editBrand: brand.Id })} />
                        <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.deleteBrand(brand.Id)} />
                    </td>
                </tr>
            )
        })
    }

    renderProduct = () => {
        var category = [];
        var subcategory = [];
        var brand = [];
        this.state.category.map(item => {
            category.push(item.Name);
        });
        this.state.subcategory.map(item => {
            subcategory.push(item.Name);
        })
        this.state.brand.map(item => {
            brand.push(item.Name);
        })


        return this.state.product.map((product, index) => {
            var renderSubcategory = '';
            var renderBrand = '';
            var renderCategory = '';
            this.state.subcategory.map(subcategory => {
                if (product.SubCategoryId === subcategory.Id) {
                    renderSubcategory = subcategory.Name;
                }
            })
            this.state.brand.map(brand => {
                if (product.Brand === brand.Id) {
                    renderBrand = brand.Name;
                }
            })
            this.state.category.map(category => {
                if (product.CategoryId === category.Id) {
                    renderCategory = category.Name;
                }
            })


            if (this.state.edit === product.Id) {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td><input type="text" ref="productname" defaultValue={product.Name} style={{ backgroundColor: "white" }} /></td>
                        <td>
                            <select>
                                {this.state.category.map(category => {
                                    return (
                                        <option onClick={() => this.setState({ tempCat: category.Id })}>{category.Name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <select>
                                {this.state.subcategory.map(subcategory => {
                                    return (
                                        <option onClick={() => this.setState({ tempSub: subcategory.Id })}>{subcategory.Name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td>
                            <select>
                                {this.state.brand.map(brand => {
                                    return (
                                        <option selected={this.state.tempBrand === brand.Id} onClick={() => this.setState({ tempBrand: brand.Id })}>{brand.Name}</option>
                                    )
                                })}
                            </select>
                        </td>
                        <td><input type="text" ref="productdescription" defaultValue={product.Description} style={{ backgroundColor: "white" }} /></td>
                        <td><input type="text" ref="productimage" defaultValue={product.Img} style={{ backgroundColor: "white" }} /></td>
                        <td><input type="number" ref="productprice" defaultValue={product.Price} style={{ backgroundColor: "white" }} /></td>
                        <td>
                            <input type="button" className="btn btn-success" value="Update" onClick={() => this.UpdateProduct(product.Id)} />
                        </td>
                    </tr>
                )
            }

            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{product.Name}</td>
                    <td>{renderCategory}</td>
                    <td>{renderSubcategory}</td>
                    <td>{renderBrand}</td>
                    <td>{product.Description}</td>
                    <td><img src={product.Img} key={product.Id} style={{ width: "150px", height: "100px" }} /></td>
                    <td>Rp {this.numberWithCommas(product.Price)}</td>
                    <td>
                        <input type="button" className="btn btn-secondary" value="Edit" onClick={() => this.setState({ edit: product.Id })} />
                        <input type="button" className="btn btn-danger" value="Delete" onClick={() => this.deleteProduct(product.Id)} />
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className=''>
                {/* BUTTON MENU ADMIN */}
                <div className="col-sm-12 d-flex justify-content-between">
                    <input type="button" className="btn btn-primary col-sm-2" onClick={() => this.setState({ active: 1, edit: 0, editBrand: 0 })} value="User" />
                    <span className="col-sm-1"></span>
                    <input type="button" className="btn btn-primary col-sm-2" onClick={() => this.setState({ active: 2, edit: 0, editBrand: 0 })} value="Category" />
                    <span className="col-sm-1"></span>
                    <input type="button" className="btn btn-primary col-sm-2" onClick={() => this.setState({ active: 3, edit: 0, editBrand: 0 })} value="Product" />
                    <span className="col-sm-1"></span>
                    <input type="button" className="btn btn-primary col-sm-2" onClick={() => this.setState({ active: 4, edit: 0, editBrand: 0 })} value="Transaction" />
                </div>


                {/* PAGE MENU ADMIN */}

                {/* USER */}
                <div style={{ display: this.state.active === 1 ? 'block' : 'none' }}>
                    <table>
                        <tr>
                            <th style={{ width: "20px" }}>No</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Phone Number</th>
                            <th>Birthday</th>
                            <th>Status</th>
                            <th style={{ width: "230px" }}>Edit</th>
                        </tr>
                        {this.renderUser()}
                    </table>
                </div>

                {/* CATEGORY */}
                <div style={{ display: this.state.active === 2 ? 'block' : 'none' }}>
                    <table style={{ width: "50%" }}>
                        <tr>
                            <th style={{ width: "20px" }}>No</th>
                            <th style={{ width: "500px" }}>Name</th>
                            <th style={{ width: "500px" }}>Category</th>
                            <th style={{ width: "230px" }}>Edit</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="addsubcategory" defaultValue="" style={{ backgroundColor: "white" }} /></td>
                            <td>
                                <select>
                                    {this.state.category.map(category => {
                                        return (
                                            <option selected={this.state.addtemp === category.Id} onClick={() => this.setState({ addtemp: category.Id })}>{category.Name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td><input type="button" className="btn btn-success" onClick={this.AddSubcategory} value="Add" /></td>
                        </tr>
                        {this.renderCategory()}
                    </table>
                    <h1>BRAND</h1>
                    {this.renderBrand()}
                </div>

                {/* PRODUCT */}
                <div style={{ display: this.state.active === 3 ? 'block' : 'none' }}>
                    <table>
                        <tr>
                            <th style={{ width: "20px" }}>No</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th>Brand</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Edit</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="text" ref="addproductname" style={{ backgroundColor: "white" }} /></td>
                            <td>
                                <select>
                                    {this.state.category.map(category => {
                                        return (
                                            <option onClick={() => this.setState({ addCat: category.Id })}>{category.Name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td>
                                <select>
                                    {this.state.subcategory.map(subcategory => {
                                        return (
                                            <option onClick={() => this.setState({ addSub: subcategory.Id })}>{subcategory.Name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td>
                                <select>
                                    {this.state.brand.map(brand => {
                                        return (
                                            <option selected={this.state.addBrand === brand.Id} onClick={() => this.setState({ addBrand: brand.Id })}>{brand.Name}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td><input type="text" ref="addproductdescription" style={{ backgroundColor: "white" }} /></td>
                            <td><input type="text" ref="addproductimage" style={{ backgroundColor: "white" }} /></td>
                            <td><input type="number" ref="addproductprice" style={{ backgroundColor: "white" }} /></td>
                            <td>
                                <input type="button" className="btn btn-success" value="Add" onClick={this.AddProduct} />
                            </td>
                        </tr>
                        {this.renderProduct()}
                    </table>
                </div>


                {/* TRANSACTION */}
                <div style={{ display: this.state.active === 4 ? 'block' : 'none' }}>
                    <TransactionAdmin />
                </div>

            </div >
        )
    }
}

export default AdminPage;