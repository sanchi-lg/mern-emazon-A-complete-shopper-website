import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { murl, productsdisbyid, deletefrom, upcartq ,cart,cartlength} from './ser';
import { RiDeleteBin6Line } from 'react-icons/ri'

import { BiCart } from 'react-icons/bi'

export class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [], idquantity: [], v: "", rs: 0, email: localStorage.getItem('uid'), page: false
        }
    }


    async componentDidMount() {

        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
        }
        else {
            await cart(localStorage.getItem('uid'))

                .then(res => {
                    this.setState({ idquantity: res.data })

                })
            await this.state.idquantity.map((v, i) => {

                productsdisbyid(v.id)
                    .then(res => {

                        this.setState(p => ({
                            product: [...p.product, { id: v.id, quantity: v.quantity, image: res.data.ob.image, price: res.data.ob.price, product: res.data.ob.product, brand: res.data.ob.brand }], rs: (v.quantity * res.data.ob.price) + p.rs
                        }), () => { this.setState({ page: true }) })


                    })

            })
        }
    }

    del = (pid) => {
        deletefrom({ email: this.state.email, id: pid }, "cart")
            .then(res => {
                if (res.data.err == 1) {
                    alert(res.data.mssg);
                }
                else {
                    cartlength(localStorage.getItem('uid'))
                        .then(res => {
                            localStorage.setItem("cnum", res.data)
                        })
                    window.location.reload()
                }

            })
    }

    q = (pid) => {

        if (document.querySelector('[name=q]')) {

            upcartq({ email: this.state.email, pid: pid, quantity: document.querySelector('[name=q]').value })
                .then(res => {
                    if (res.data.err == 1) {
                        alert(res.data.mssg);
                    }
                    else if (res.data.err == 0) {
                        cartlength(localStorage.getItem('uid'))
                            .then(res => {
                                localStorage.setItem("cnum", res.data)
                            })
                        window.location.reload()
                    }

                })
        }
    }

    render() {


        return (
            <div>
                {this.state.page && <div>
                    {this.state.product.length == 0 ? <div className="empty">
                        <div style={{ color: "purple" }}>
                            <BiCart />
                        </div>
                        <h2 style={{ color: "black" }} >There are no items in the cart</h2>
                        <h2><Link to="/wishlist" style={{ textDecoration: "none" }}>Add From Your Wishlist</Link></h2>
                        <div>
                            <Link to=""><button>Continue Shopping</button></Link>
                        </div>


                    </div> :
                        <div>


                            <div className="wishlist">
                                <br />
                                <h1 style={{ color: "purple", fontWeight: "normal", fontSize: "18px" }}>Cart({this.state.product.length} items)  </h1>
                                <br />
                                <ul className="wishproduct">


                                    {this.state.product.map(pro =>
                                        <li>
                                            <Link >
                                                <div className="wish-image">
                                                    <img src={`${murl}/${pro.image}`} />
                                                </div>
                                                <div className="wish-details">
                                                    <div className="products-brand">{pro.brand}</div>
                                                    <div className="products-name">{pro.product}</div>
                                                    <div className="product-quantity" style={{ color: "purple" }}>
                                                        Quantity:<select name="q" onChange={() => this.q(pro.id)}>
                                                            <option selected={1 == pro.quantity}>1</option>
                                                            <option selected={2 == pro.quantity}>2</option>
                                                            <option selected={3 == pro.quantity}>3</option>
                                                            <option selected={4 == pro.quantity} >4</option>



                                                        </select>
                                                    </div>
                                                    <div className="products-price">Rs{pro.price}</div>

                                                </div>
                                            </Link>
                                            <div className="wish-action">
                                                <button className="del" onClick={() => this.del(pro.id)}><RiDeleteBin6Line /></button>
                                            </div>
                                        </li>
                                    )
                                    }
                                </ul>
                            </div>


                            <div className="carttotal">
                                <br />
                                <h2>Subtotal:<span style={{ color: "crimson" }}>Rs{Math.round(this.state.rs)}</span></h2>
                            </div>
                            <div className="cartptp">
                                <Link to={{ pathname: "/addressselection", order: { tprice: this.state.rs, oarray: this.state.product } }} ><button>Proceed to Pay</button></Link>
                            </div>
                        </div>

                    }
                </div>
                }


            </div>







        )
    }
}

export default Cart
