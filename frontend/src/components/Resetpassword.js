import React, { Component } from 'react'
import Pagenf from './Pagenf'
import { resetpasswordaftermail } from './ser'

export class Resetpassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, token: this.props.match.params.token, npassword: "", cpassword: "", page: true
        }
    }


    
    sub = (e) => {
        e.preventDefault()
        if (this.state.npassword != this.state.cpassword) {
            alert("password should be same in both fields")
        }
        else {
            resetpasswordaftermail(this.state)
                .then(res => {
                    alert(res.data.mssg)
                    if (res.data.err == 0) {
                        this.props.history.push("/")
                    }
                    if (res.data.err == 1 && res.data.mssg == "invalid link") {
                        this.setState({ page: false })
                    }
                })
        }
    }
    handle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div>
                {this.state.page == true ?
                    <form className="newpro">
                        <br />
                        <br />
                        <h3 style={{fontWeight:"normal"}}>Reset your password here:</h3>
                        <br/>
                        <div>
                            <label>New Password</label>
                            <input type="password" name="npassword" onChange={this.handle} required />

                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input type="password" name="cpassword" onChange={this.handle} required />

                        </div>
                        <button type="submit" onClick={this.sub}>Submit</button>
                        <br/>
                    </form> : <Pagenf />}
            </div>
        )
    }
}

export default Resetpassword
