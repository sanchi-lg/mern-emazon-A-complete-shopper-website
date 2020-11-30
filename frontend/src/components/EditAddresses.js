import React, { Component } from 'react'
import { deladdress, getaddress } from './ser'
export class EditAddresses extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: localStorage.getItem('uid'), address: []
        }
    }
    componentDidMount() {
        if (localStorage.getItem('uid') == undefined) {
            alert("login first")
            this.props.history.push("/register")
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
            .then(res => {

            })
        getaddress(this.state.email)
            .then(res => {

                this.setState({ address: res.data })

            })
    }

    render() {

        return (
            <div style={{ width: "60%", margin: "3rem auto" }}>
                <h2>Addresses</h2>
                <div style={{ width: "100%", height: "2.5rem", margin: "1rem", marginLeft: '0', padding: "0.3rem", borderRadius: "0.2rem", border: "0.1rem solid lightgrey" }}>

                    <button className="na" onClick={this.na} style={{ color: "darkblue", background: "white", fontSize: "medium", border: "none" }} >Add a New Address</button>
                </div>

                <h2>Personal Addresses</h2>
                {this.state.address.map((a, ind) =>
                    <div style={{
                        width: "100%", fontSize: "medium", margin: "1rem", marginLeft: '0', padding: "0.3rem", paddingTop: "0",
                        borderRadius: "0.2rem", border: "0.1rem solid lightgrey"
                    }}>
                        {a.split('\n').map((an, i) =>
                            (i == 0 ? <h4>{an}</h4> : <p style={{ margin: "0" }}> {an} </p>)
                        )}
                        <br />
                        <button onClick={() => this.ra(ind)}>Remove</button>
                    </div>

                )}

            </div>

        )
    }
}

export default EditAddresses
