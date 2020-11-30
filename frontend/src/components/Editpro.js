import React, { Component } from 'react'
import { productsdisbyid, murl, upprowithoutimage, upprobyimage, getcat } from './ser';
export class Editpro extends Component {


    constructor(props) {
        super(props)
        this.state = {
            cid: this.props.match.params.v, category: "", wear: "", product: "", products: [], brand: "", oprice: "", discount: "", description: "", image: "", err: "", w: []
        }
    }

    async componentDidMount() {
        if (localStorage.getItem('aid') == undefined) {
            this.props.history.push("/")
        }
        else {
            await productsdisbyid(this.state.cid)
                .then(res => {
                    this.setState({ products: res.data.ob })
                    this.setState({ category: this.state.products.category, wear: this.state.products.wear, product: this.state.products.product, brand: this.state.products.brand, oprice: this.state.products.oprice, discount: this.state.products.discount, description: this.state.products.description })

                })
            await getcat(this.state.category)
                .then(res => {

                    this.setState({ w: res.data.ob })

                })

        }
    }
    image = (e) => {

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

   

    np = (e) => {
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


        if (this.state.image == "") {

            upprowithoutimage({ 'pro': str })
                .then(res => {
                    alert(res.data.mssg);
                })
            this.props.history.push("/addpro")
        }
        else {
            formdata.append('attach', this.state.image)

            upprobyimage(formdata)
                .then(res => {
                    alert(res.data.mssg);
                })
            this.props.history.push("/addpro")
            window.location.reload();

        }



    }

    render() {

        return (
            <div>

                < form className="newpro a" onSubmit={this.np}>
                    <fieldset>
                        <legend>Edit Product:</legend>
                        <div>
                            <label>Category</label>
                            <select name="category" value={this.state.category} onChange={this.w} required>
                                <option name="category" value="">Select</option>
                                <option name="category" value="men" >Men</option>
                                <option name="category" value="women">Women</option>
                                <option name="category" value="kids">Kids</option>

                            </select>
                            <br />
                            <select name="wear" value={this.state.wear} onChange={this.handle} required>
                                <option name="wear" value={this.state.wear}>{this.state.wear}</option>

                                {this.state.w.map(v =>
                                    <option name="wear" key={v} value={v}>{v}</option>
                                )}


                            </select>
                            <br />

                            <label>Product</label>
                            <input type="text" name="product" value={this.state.product} required onChange={this.handle} />
                        </div>
                        <div>
                            <label>Brand</label>
                            <input type="text" name="brand" value={this.state.brand} required onChange={this.handle} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type="number" name="oprice" value={this.state.oprice} required onChange={this.handle} />
                        </div>
                        <div>
                            <label>Discount</label>
                            <input type="number" min="0" max="100" name="discount" value={this.state.discount} required onChange={this.handle} />
                        </div>
                        {this.state.oprice && this.state.discount &&
                            <div>
                                <h4 style={{ fontWeight: "normal", fontFamily: "cursive" }}> Price After Discount:{((100 - this.state.discount) * this.state.oprice) / 100}</h4>
                            </div>}
                        <div>
                            <label>Image</label>
                            <input type="file" name="image" id="img" className="img" title="" onChange={this.image} />
                            {this.state.err !== "" && <p style={{ color: "red", fontWeight: "normal", fontSize: "small" }}>{this.state.err}</p>}

                        </div>
                        <div>
                            <label>Description</label>
                            <textarea name="description" value={this.state.description} onChange={this.handle}></textarea>
                        </div>
                        <button type="submit" >Submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Editpro
