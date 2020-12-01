import React, { Component } from 'react'
import { addpro, getcat, productsdis, murl, deletepro } from './ser'
import { Link } from 'react-router-dom'

export class Addpro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: "", wear: "", product: "", products: [], brand: "", oprice: "", discount: "", description: "", image: "", err: "", w: []
        }
    }


    componentDidMount() {
        if (localStorage.getItem('aid') == undefined) {
            this.props.history.push("/")
        }
        else {
            productsdis()
                .then(res => {

                    this.setState({ products: res.data.ob })

                })
        }
    }



    delpro = async (id) => {
        if (window.confirm("do u want to delete")) {
            await deletepro(id)
                .then(res => {
                    alert(res.data.mssg)
                })
            window.location.reload();


        }
    }



    image = (e) => {
        this.setState({ err: "" })

        if (e.target.files.length > 0) {
            if (e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpg") {

                this.setState({ image: e.target.files[0] })

            }
            else {
                this.setState({ err: "only jpeg or png image allowed" })
            }
        }
    }

    handle = (e) => {
        const { name, value } = e.target
        if (name == "discount") {
            if (value < 0 || value > 100) {

                this.setState({ discount: "" })

                document.querySelector("[name='discount']").value = ""

                return
            }
        }

        this.setState({ [name]: value })


    }
    w = (e) => {
        this.state.w = []
        this.state.wear = ""
        const { name, value } = e.target
        this.setState({ [name]: value })
        getcat(value)
            .then(res => {

                this.setState({ w: res.data.ob })

            })
    }

  


    np = async (e) => {

        e.preventDefault()
        let formdata = new FormData()
        let str = ""
        for (let x in this.state) {
            if (x != "image" && x != "w" && x != "err" && x != "products") {
                if (x == 'description') {
                    str += '"' + x + '":"' + this.state[x] + '"'

                }
                else {
                    str += '"' + x + '":"' + this.state[x] + '",'

                }
            }
        }

        formdata.append('pro', str)
        formdata.append('attach', this.state.image)

        await addpro(formdata)
            .then(res => {
                alert(res.data.mssg);
            })
        window.location.reload();


    }


    render() {

        return (
            <div>
                <div>
                    < form className="newpro a" autoComplete="on" onSubmit={this.np} >
                        <fieldset>
                            <legend>New Product:</legend>
                            <div>
                                <label>Category</label>
                                <select name="category" onChange={this.w} required >

                                    <option name="category" value="">Select</option>

                                    <option name="category" value="men" >Men</option>
                                    <option name="category" value="women">Women</option>
                                    <option name="category" value="kids">Kids</option>

                                </select>
                                <br />
                                <select name="wear" onChange={this.handle}>
                                    <option value="">Select</option>
                                    {this.state.w.map(v =>
                                        <option value={v}>{v}</option>
                                    )}
                                </select>
                                <br />


                            </div>
                            <div>
                                <label>Brand</label>
                                <input type="text" name="brand" required onChange={this.handle} />
                            </div>
                            <div>
                                <label>Product</label>
                                <input type="text" name="product" required onChange={this.handle} />
                            </div>
                            <div>
                                <label>Price</label>
                                <input type="number" name="oprice" required onChange={this.handle} />
                            </div>
                            <div>
                                <label>Discount</label>
                                <input type="number" name="discount" min="0" max="100" onChange={this.handle} />
                            </div>
                            {this.state.oprice && this.state.discount &&
                                <div>
                                    <h4 style={{ fontWeight: "normal", fontFamily: "cursive" }}> Price After Discount:{((100 - this.state.discount) * this.state.oprice) / 100}</h4>
                                </div>}
                            <div>
                                <label>Upload Image</label>
                                <input type="file" name="image" required onChange={this.image} />
                                <br />

                            </div>
                            <div>
                                <label>Description</label>
                                <textarea name="description" onChange={this.handle}></textarea>
                            </div>
                            {this.state.err !== "" && <p style={{ color: "red", fontWeight: "normal", fontSize: "small" }}>{this.state.err}</p>}

                            <button type="submit" >Submit</button>
                        </fieldset>
                    </form>
                </div>

                <div className="protable">
                    <table >

                        <tr>
                            <th>S.No</th>
                            <th colSpan={2}>Category</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Discount</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Created-at</th>
                            <th colSpan={2}>Action</th>

                        </tr>
                        {this.state.products.map((pro, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{pro.category}</td>
                                <td>{pro.wear}</td>
                                <td style={{ maxWidth: "3rem", overflow: "hidden", textOverflow: "ellipsis" }}>{pro.product}</td>

                                <td style={{ maxWidth: "3rem", overflow: "hidden", textOverflow: "ellipsis" }}>{pro.brand}</td>
                               {pro.discount==undefined?<td></td>:<td>{pro.discount}%</td>}

                                <td><del>{pro.oprice}</del> {pro.price}</td>

                                <td style={{ maxWidth: "3rem", overflow: "hidden", textOverflow: "ellipsis" }}>{pro.description}</td>
                                <td><img src={`${murl}/${pro.image}`} width={50} height={50} /></td>
                                <td>{pro.created_at}</td>
                                <td><Link to={`/editpro/${pro._id}`}>Edit</Link>  </td>
                                <td><button onClick={() => this.delpro(pro._id)}>Delete</button></td>

                            </tr>
                        )}

                    </table>
                </div>
            </div>

        )
    }
}


export default Addpro
