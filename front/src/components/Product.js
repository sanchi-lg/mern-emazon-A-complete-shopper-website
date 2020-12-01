import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { productsdisbyid, murl, atc, atw, cartlength } from './ser'

export class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, product: "", quantity: 1, email: localStorage.getItem('uid')
        }
    }
    q = (e) => {

        this.setState({ quantity: e.target.value })
    }
    componentDidMount() {
        productsdisbyid(this.state.id)
            .then(res => {
                this.setState({ product: res.data.ob })

            })

    }
    atce = () => {
        if (this.state.email == "") {
            if (localStorage.getItem('aid')) {
                alert("login as a user for shopping!")

            }
            else {
                alert("login first")
                this.props.history.push("/usersignin")
            }
        }

        else {
            atc(this.state)
                .then(res => {
                    if (res.data.err == 1) {
                        alert(res.data.mssg);
                    }
                    else {
                        cartlength(localStorage.getItem('uid'))
                            .then(res => {
                                localStorage.setItem("cnum", res.data)
                            })
                        this.props.history.push("/cart")
                        window.location.reload()

                    }
                })
        }
    }

    wish = () => {
        if (this.state.email == "") {
            if (localStorage.getItem('aid')) {
                alert("login as a user for shopping!")

            }
            else {
                alert("login first")
                this.props.history.push("/usersignin")
            }
        }
        else {
            atw({ email: this.state.email, id: this.state.id })
                .then(res => {
                    if (res.data.err == 1) {
                        alert(res.data.mssg);
                    }
                    else {
                        this.props.history.push("/wish")
                        window.location.reload()

                    }


                })
        }
    }

    render() {
        const { product } = this.state
        return (
            <div >
                {this.state.product != "" && <div className="product">
                    <Link to="/" className="btr">Back to result</Link>
                    <div className="details">
                        <div className="products-image"><img src={`${murl}/${this.state.product.image}`}></img></div>
                        <div className="products-brand">{product.brand}</div>
                        <div className="products-name">{product.product}</div>

                        <div className="product-price">Rs{product.price}</div>
                        {product.oprice != product.price ? <div className="product-price"><del>Rs{product.oprice}</del> ({product.discount}% OFF)</div> : <div ></div>}

                        <div className="products-description">{product.description}</div>



                    </div>
                    <div className="product-action">
                        <div>Price:Rs{product.price}</div>
                        <div>Quantity:<select name="q" onChange={this.q}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>



                        </select>
                        </div>
                        <button className="atc" onClick={this.atce} style={{ background: "yellow" }}>Add to Cart</button>
                        <button className="wish" onClick={this.wish} style={{ marginTop: "25px", background: "orange" }}>Add to Wishlist</button>

                    </div>

                </div>}

            </div>
        )
    }
}

export default Product
