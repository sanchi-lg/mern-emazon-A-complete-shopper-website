import React, { Component } from 'react'
import { order,cartlength } from './ser'

export class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.getItem('uid'), pay: ""
        }
    }
    componentDidMount() {
        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
        }
        else if (localStorage.getItem('cart') == 0 || this.props.location.order == undefined) {

            this.props.history.push("/")
        }

    }

    pay = () => {
        if (this.state.pay == "Cash on Delivery") {
            order({ email: this.state.email, order: this.props.location.order })
                .then(res => {
                    if (res.data.err == 1) {
                        alert(res.data.mssg)
                    }
                    else {
                        this.props.history.push("/")
                        cartlength(localStorage.getItem('uid'))
                            .then(res => {
                                localStorage.setItem("cnum", res.data)
                            })
                    }
                })
        }
        alert("your order is placed successfully")
    }

    handlee = (e) => {
        this.setState({ pay: e.target.value }, () => {
            this.props.location.order["paymentMode"] = this.state.pay

        })



    }
    render() {

        return (
            <div style={{ background: "rgb(250, 246, 246)" }}>
                <div className="checkout">
                    <h1>Select a payment method</h1>
                    <form onSubmit={this.pay}>
                        <div>
                            <input type="radio" name="pay" disabled onChange={this.handlee} /><label>Other UPI Apps</label>
                        </div>
                        <div>
                            <input type="radio" name="pay" disabled onChange={this.handlee} /><label>Add Debit/Credit/ATM Card</label>
                        </div>
                        <div>
                            <input type="radio" name="pay" disabled onChange={this.handlee} /><label>Net Banking</label>
                        </div>
                        <div>
                            <input type="radio" value="Cash on Delivery" name="pay" onChange={this.handlee} /><label>Pay on Delivery</label>
                        </div>
                        <button>Continue</button>

                    </form>
                </div>
            </div>
        )
    }
}

export default Checkout
