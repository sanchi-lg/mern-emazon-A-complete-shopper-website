import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FaRegHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { murl, wish, productsdisbyid, atc, deletefrom,cartlength } from './ser';
export class Wishlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [], idquantity: [], v: "", email: localStorage.getItem('uid')
        }
    }


    async componentDidMount() {

        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
        }

        await wish(localStorage.getItem('uid'))

            .then(res => {
                this.setState({ idquantity: res.data })

            })
        await this.state.idquantity.map((v, i) => {

            productsdisbyid(v)
                .then(res => {

                    this.setState(p => ({
                        product: [...p.product, { id: v, image: res.data.ob.image, price: res.data.ob.price, product: res.data.ob.product, brand: res.data.ob.brand }]
                    }))

                })

        })

    }

    atce = (pid) => {

        atc({ email: this.state.email, id: pid, quantity: 1 })
            .then(res => {
                if (res.data.err == 1) {
                    alert(res.data.mssg);
                }

                else {
                    cartlength(localStorage.getItem('uid'))
                        .then(res => {
                            localStorage.setItem("cnum", res.data)
                            this.props.history.push("/cart")

                        })

                }
            })
    }

    del = (pid) => {
        deletefrom({ email: this.state.email, id: pid }, "wish")
            .then(res => {
                if (res.data.err == 1) {
                    alert(res.data.mssg);
                }
                else {
                    window.location.reload()
                }

            })
    }


    render() {

        return (
            <div>
                {this.state.product.length == 0 ? <div className="empty">
                    <div>
                        <FaRegHeart />
                    </div>
                    <h2>There are no items in the wishlist</h2>
                    <h1>Explore more and shortlist some items</h1>
                    <div>
                        <Link to=""><button>Continue Shopping</button></Link>
                    </div>
                </div> :

                    <div className="wishlist">
                        <br />
                        <h1>WISHLIST({this.state.product.length} items)  </h1>
                        <br />
                        <ul className="wishproduct">
                            {this.state.product.map(pro =>
                                <li>
                                    <Link to={`/products/${pro.id}`}>
                                        <div className="wish-image">
                                            <img src={`${murl}/${pro.image}`} />
                                        </div>
                                        <div className="wish-details">
                                            <div className="products-brand">{pro.brand}</div>
                                            <div className="products-name">{pro.product}</div>

                                            <div className="products-price">Rs{pro.price}</div>

                                        </div>
                                    </Link>
                                    <div className="wish-action">
                                        <button className="del" onClick={() => this.del(pro.id)}><RiDeleteBin6Line /></button>
                                        <button className="atc" onClick={() => this.atce(pro.id)}>Add To Cart</button>
                                    </div>
                                </li>
                            )
                            }
                        </ul>
                    </div>}
            </div>

        )
    }
}

export default Wishlist
