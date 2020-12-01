import React, { Component } from 'react'
import { register, registersl } from './ser'
import { Link } from 'react-router-dom'
import { BiCheck } from 'react-icons/bi';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';




export class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "", name: "", password: "", show: false
    }

  }

  componentDidMount() {
    if (localStorage.getItem('uid') || localStorage.getItem('aid')) {
      this.props.history.push("/")
    }

  }

  handle = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  registere = (e) => {
    e.preventDefault()

    register(this.state)
      .then(res => {
        alert(res.data.mssg)

        if (res.data.err == 0) {

          this.props.history.push("/login/user")
        }


      })
  }
  responseFacebook = (response) => {
    if (response.accessToken) {
      registersl({ email: response.id, name: response.name })
        .then(res => {
          if (res.data.err == 0) {
            localStorage.setItem('uid', res.data.uid.email)
            localStorage.setItem('uname', res.data.uid.name)
            this.props.history.push("/")
          }
          else {
            alert(res.data.mssg)

          }

        })
    }
  }



  responseGoogle = (response) => {
    registersl({ email: response.profileObj.email, name: response.profileObj.name })
      .then(res => {
        if (res.data.err == 0) {
          localStorage.setItem('uid', res.data.uid.email)
          localStorage.setItem('uname', res.data.uid.name)

          this.props.history.push("/")
        }
        else {
          alert(res.data.mssg)

        }

      })
  }

  show = () => {
    this.setState(p => (
      { show: !p.show }
    ))
  }


  render() {
    return (
      <div>

        < form className="newpro" onSubmit={this.registere}>
          <fieldset>
            <legend>New User:Register</legend>
            <div>
              <label>Email</label>
              <input name="email" type="email" onChange={this.handle} required />

            </div>
            <div>
              <label >Name</label>
              <input name="name" type="text" onChange={this.handle} required />

            </div>
            <div>
              <label >Password</label>
              <input name="password" type={this.state.show ? 'text' : 'password'} onChange={this.handle} required />

            </div>
            <div>
              <button type="button" style={{
                margin: 0, marginTop: "5.6px", marginRight: "1.12px", borderColor: "grey", borderRadius: "0.01rem", borderWidth: "0.1rem"
                , width: "13px", height: "12px", background: "white", padding: 0, color: "black"
              }} onClick={this.show}>

                {this.state.show &&
                  <BiCheck className="checkicon" style={{ margin: 0, border: 0, padding: 0 }} />
                }
              </button>
              <p style={{ textAlign: "left", display: "inline", color: "grey", fontSize: "12.3px" }}>Show password</p>
            </div>
            <button type="submit">Submit</button>
            <br />
            <p style={{ fontSize: "small" }}>Already have an account? <Link to="/login/user">Login here</Link></p>

          </fieldset>
        </form>



        <div className="social">
          <h3 style={{ fontWeight: "normal", color: "black" }}>or</h3>
          <h2 style={{ color: "rgb(4, 28, 161)", fontWeight: "normal", fontSize: "large" }}>Sign-up with:</h2>

          <GoogleLogin

            clientId="266559560838-812vk1te2om7guo3iumu37f18etnsh89.apps.googleusercontent.com"

            render={renderprops => (
              <button onClick={renderprops.onClick} style={{ borderColor: "transparent", borderRadius: "2.2rem", padding: 0, marginRight: "24.6px" }} ><img src={"images/googleicon.png"} height={39} /></button>
            )}
            onSuccess={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />

          <FacebookLogin

            appId="311489883578735"
            autoLoad={false}
            fields="name,email,picture"
            render={renderprops => (
              <button onClick={renderprops.onClick} style={{ borderColor: "transparent", borderRadius: "2.2rem", padding: 0 }}><img src={"images/facebookicon.png"} height={44} /></button>
            )
            }
            onClick={this.fClicked}
            callback={this.responseFacebook}
          />


        </div>


      </div>
    )
  }
}

export default Register
