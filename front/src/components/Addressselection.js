import React, { Component } from 'react'
import { deladdress, getaddress } from './ser'
import { Link } from 'react-router-dom'

export class Addressselection extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.getItem('uid'), address: [], selectedaddress: "f",order:this.props.location.order
        }
    }

    componentDidMount() {
   
        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
        }
        else if(localStorage.getItem('cart') == 0||this.state.order==undefined) {
           
                this.props.history.push("/")
        }
        else {

            getaddress(this.state.email)
                .then(res => {

                    this.setState({ address: res.data })


                })
        }
    }

    na = () => {
        if (this.state.address.length == 4) {
            alert("can't add more than 4 addresses")
        }
        else {
            this.props.history.push("/addaddress")
        }
    }
    ra = async (ind) => {
        await deladdress(this.state.email, ind)

        getaddress(this.state.email)
            .then(res => {

                this.setState({ address: res.data })

            })
    }



    handlee = (i) => {
      

        this.setState({ selectedaddress: i },()=>       {
           
        this.state.order["address"]=this.state.address[this.state.selectedaddress] 

        }

        )
        
    }

    
    render() {

        return (
            <div style={{ width: "60%", margin: "3rem auto" }}>

                <h1>Select a delivery Address</h1>
                {this.state.address.map((a, ind) =>

                    <label to={`i${ind}`} > <div className="addsel" style={{
                        width: "100%", fontSize: "medium", margin: "1rem", marginLeft: '0', padding: "0.3rem", paddingTop: "0",
                        borderRadius: "0.5rem", border: "0.1rem solid lightgrey"
                    }}>
                        <input type='radio' id={`i${ind}`} name='address' onChange={() => this.handlee(ind)} />

                        {a.split('\n').map((an, i) =>
                            (i == 0 ? <h4>{an}</h4> : <p style={{ margin: "0" }}> {an} </p>)
                        )}
                        <br />
                        <button onClick={() => this.ra(ind)}>Remove</button>
                        {this.state.selectedaddress == ind &&
                            <div>
                                <Link to={{ pathname: "/checkout", order:this.state.order}}><button style={{
                                    width: "170px", height: "42px",
                                    borderColor: "transparent",
                                    borderRadius: "0.4rem", marginTop: "7px",
                                    backgroundColor: "rgb(245, 176, 49)", textAlign: "center"
                                }}>Deliver to this address</button></Link>
                            </div>
                        }
                    </div>
                    </label>

                )}
                <br />
                <div style={{ width: "100%", height: "2.5rem", margin: "1rem", marginLeft: '0', padding: "0.3rem", borderRadius: "0.2rem", border: "0.1rem solid lightgrey" }}>

                    <button className="na" onClick={this.na} style={{ color: "darkblue", background: "white", fontSize: "medium", border: "none" }} >Add a New Address</button>
                </div>

            </div>

        )
    }
}

export default Addressselection
