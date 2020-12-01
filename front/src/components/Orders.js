import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { murl, orders } from './ser';
import { BiCart } from 'react-icons/bi'

export class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orders: [], email: localStorage.getItem('uid'), page: false
        }
    }


    async componentDidMount() {

        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
        }
        else {
            await orders(localStorage.getItem('uid'))

                .then(res => {
                    this.setState({ orders: res.data }, () => { this.setState({ page: true }) })

                })







        }
    }


    render() {


        return (
            <div>
                {this.state.page && <div>

                    {this.state.orders.length == 0 ? <div className="empty">

                        <h2 style={{ color: "purple" }}>You have not placed any order yet</h2>
                        <div style={{ color: "purple" }} >
                            <BiCart />
                        </div>
                        <h2 ><Link to="/cart" style={{ textDecoration: "none", color: "black" }}>Checkout to place order</Link></h2>
                        <div>
                            <Link to=""><button>Continue Shopping</button></Link>
                        </div>
                    </div> :
                        <div>






                            <div className="wishlist">
                                <br />
                                <h1 style={{ color: "purple", fontWeight: "normal", fontSize: "24px" }}>My Orders</h1>
                                <br />

                                {this.state.orders.map(ord =>

                                    <div style={{ marginBottom: "50px" }}>
                                        <ul className="wishproduct">


                                            {ord.oarray.map(pro =>
                                                <li>
                                                    <Link >
                                                        <div className="wish-image">
                                                            <img src={`${murl}/${pro.image}`} />
                                                        </div>
                                                        <div className="wish-details">
                                                            <div className="products-brand">{pro.brand}</div>
                                                            <div className="products-name">{pro.product}</div>
                                                            <div className="product-quantity" style={{ color: "purple" }}>Quantity:{pro.quantity}
                                                            </div>
                                                            <div className="products-price">Rs{pro.price}</div>

                                                        </div>
                                                    </Link>

                                                </li>
                                            )
                                            }

                                        </ul>



                                        <div className="carttotal">
                                            <br />
                                            <p>Placed on: <span style={{ color: "purple" }}>{ord.date}</span></p>
                                            <p>Payment Mode: <span style={{ color: "purple" }}>{ord.paymentMode}</span></p>
                                            <h2>Subtotal: <span style={{ color: "crimson" }}>Rs{Math.round(ord.tprice)}</span></h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <br />

                        </div>
                    }
                </div>
                }


            </div>







        )
    }
}

export default Orders
