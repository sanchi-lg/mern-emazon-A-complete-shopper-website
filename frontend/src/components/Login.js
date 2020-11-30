import React, { Component } from 'react'
import { login, registersl, resetpassword } from './ser'
import { BiCheck } from 'react-icons/bi';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export class Login extends Component {
    constructor(props) {
        super(props)




        this.state = {
            email: "", password: "", v: this.props.match.params.v, err: "", show: false
        }

    }
    componentDidMount() {
        if (localStorage.getItem('uid') || localStorage.getItem('aid')) {
            this.props.history.push("/")
        }

    }

    forgetpassword = () => {
        var pattern = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
        if (this.state.email == "") {
            this.setState({ err: "Enter registered Email-id" })
        }
        else if (!pattern.test(this.state.email)) {
            this.setState({ err: "Enter valid Email-id" })

        }
        else {

            resetpassword({ email: this.state.email })

                .then(res => {

                    alert(res.data.mssg)
                })
        }
    }

    show = () => {
        this.setState(p => (
            { show: !p.show }
        ))
    }

    responseFacebook = (response) => {
        if (response.accessToken) {
            registersl({ email: response.id, name: response.name })
                .then(res => {
                    alert(res.data.mssg)
                    if (res.data.err == 0) {
                        localStorage.setItem('uid', res.data.uid.email)
                        localStorage.setItem('uname', res.data.uid.name)

                        this.props.history.push("/")
                    }

                })
        }
    }



    responseGoogle = (response) => {

        registersl({ email: response.profileObj.email, name: response.profileObj.name })
            .then(res => {
                alert(res.data.mssg)
                if (res.data.err == 0) {
                    localStorage.setItem('uid', res.data.uid.email)
                    localStorage.setItem('uname', res.data.uid.name)
                    this.props.history.push("/")

                }

            })
    }
    handle = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleemail = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
        if (value != "") {
            this.setState({ err: "" })
        }

    }

    logine = (e) => {
        e.preventDefault()
        login(this.state.v, this.state)


            .then(res => {
                if (res.data.err == 1) {
                    alert(res.data.mssg);
                }
                if (res.data.err === 0) {

                    if (this.state.v == "admin") {
                        localStorage.setItem('aid', res.data.uid.email)
                        localStorage.setItem('aname', res.data.uid.name)
                        this.props.history.push("/addpro")

                    }
                    if (this.state.v == "user") {
                        localStorage.setItem('uid', res.data.uid.email)
                        localStorage.setItem('uname', res.data.uid.name)
                        this.props.history.push("/")

                    }
                }

            }
            )
    }

    render() {
        return (
            <div>

                < form className="newpro" style={{ padding: "2px" }} onSubmit={this.logine}>
                    <fieldset style={{ marginTop: "0" }} >
                        <legend>Login:</legend>
                        <div >
                            <label>Email</label>
                            <input name="email" type="email" onChange={this.handleemail} required />

                        </div>
                        {this.state.err != "" ? <div style={{ fontSize: "small", color: "red", marginLeft: "9rem" }}>{this.state.err}</div> : ""}

                        <div>
                            <label>Password</label>
                            <input name="password" type={this.state.show ? 'text' : 'password'} onChange={this.handle} required />

                        </div>
                        <div>
                            <button type="button" style={{
                                margin: 0, marginTop: "5.6px", marginRight: "1.12px", borderColor: "grey", borderRadius: "0.01rem", borderWidth: "0.1rem"
                                , width: "13px", height: "12px", background: "white", padding: 0, color: "black"
                            }} onClick={this.show}>

                                {this.state.show &&
                                    <BiCheck className="checkicon" style={{ margin: 0 }} />
                                }
                            </button>
                            <p style={{ textAlign: "left", display: "inline", color: "grey", fontSize: "12.3px" }}>Show password</p>
                        </div>
                        <div ><button type="button" style={{color:"purple",cursor:"pointer",marginLeft:"14rem",marginTop:"1.3px",fontSize:"10px",border:"none",background:"transparent",width:"145px"}} onClick={this.forgetpassword}>Forgot Password?</button></div>

                        <button >Submit</button>

                    </fieldset>
                </form>
                {this.state.v == "user" &&
                    <div className="social">
                        <h3 style={{ fontWeight: "normal", color: "black" }}>or</h3>
                        <h2 style={{ color: "rgb(4, 28, 161)", fontWeight: "normal", fontSize: "large" }}>Login with:</h2>

                        <GoogleLogin

                            clientId="266559560838-812vk1te2om7guo3iumu37f18etnsh89.apps.googleusercontent.com"

                            render={renderprops => (
                                <button onClick={renderprops.onClick} style={{ borderColor: "transparent", borderRadius: "2.2rem", padding: 0, marginRight: "24.6px" }} ><img src={"/images/googleicon.png"} height={39} /></button>
                            )}
                            onSuccess={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        <FacebookLogin

                            appId="311489883578735"
                            autoLoad={false}
                            fields="name,email,picture"
                            render={renderprops => (
                                <button onClick={renderprops.onClick} style={{ borderColor: "transparent", borderRadius: "2.2rem", padding: 0 }}><img src={"/images/facebookicon.png"} height={44} /></button>
                            )
                            }
                            onClick={this.fClicked}
                            callback={this.responseFacebook}
                        />


                    </div>}



            </div>
        )
    }
}

export default Login