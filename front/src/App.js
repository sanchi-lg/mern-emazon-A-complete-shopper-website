import React, { Component } from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import Home from './components/Home';
import Products from './components/Product';
import Addpro from './components/Addpro';
import Editpro from './components/Editpro';
import Register from './components/Register';
import Filter from './components/Filter';
import { AiOutlineSearch } from 'react-icons/ai'

import Cart from './components/Cart';
import Contact from './components/Contact';
import { BiCart } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa'

import ReactDOM from 'react-dom'

import Resetpassword from './components/Resetpassword';
import Wishlist from './components/Wishlist';
import EditAddresses from './components/EditAddresses';
import Addaddress from './components/Addaddress';
import Pagenf from './components/Pagenf';

import Login from './components/Login';
import Checkout from './components/Checkout';
import { cart, getcat, cartlength } from './components/ser';
import Addressselection from './components/Addressselection';
import Orders from './components/Orders';
import EditProfile from './components/EditProfile';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spos: true, iRef: React.createRef(), sc: "", sca: []
    }

  }


  signin = (e) => {
    if (e.target.value === 'admin') {

      this.props.history.push("/login/admin")

    }
    if (e.target.value === 'user') {

      this.props.history.push("/register")
    }
  }

  logout = () => {
    if (localStorage.getItem('uid')) {
      localStorage.removeItem('uid')
      localStorage.removeItem('uname')
      localStorage.removeItem('cnum')


    }
    else {
      localStorage.removeItem('aid')
      localStorage.removeItem('aname')


    }
    alert("logged out successfully")
    window.location.reload();

  }



  openmenu = () => {
    document.querySelector('.sidebar').classList.add('open');

  }

  closemenu = () => {
    document.querySelector('.sidebar').classList.remove('open');

  }

  componentDidMount = () => {

    this.windowdim();
    window.addEventListener("resize", this.windowdim)

  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.windowdim)

  }

  windowdim = async () => {

    if (window.innerWidth >= 880) {
      await this.setState({ spos: true })
    }
    else {
      await this.setState({ spos: false })

    }

  }


  sc = (v) => {
    if (this.state.sc == v) {
      this.setState({ sc: "" })
      this.setState({ sca: [] })

    }
    else {
      this.setState({ sc: v })
      getcat(v)
        .then(res => {

          this.setState({ sca: res.data.ob })

        })
    }
  }






  render() {
    return (
      <div className="grid-container">
        <header className="header">

          <p><button className="btnoside" onClick={this.openmenu} >&#9776;</button> emazon</p>
          <div className="cartsign">
            {this.state.spos && this.state.iRef.current != null &&
              <div className="i">

                <input type="text" placeholder="Search" name="search" onKeyPress={this.state.iRef.current.shandle} /><button onClick={this.state.iRef.current.search}>{<AiOutlineSearch />}</button>

              </div>}
            {!localStorage.getItem("aid") &&
              <Link to="/wishlist" title="wishlist" className="wish">{<FaHeart />}</Link>}

            {!localStorage.getItem("aid") && localStorage.getItem("cnum") && localStorage.getItem("cnum") != 0 &&

              <Link to="/cart" >Cart<span className="csvg">{<BiCart />}</span><span className="cbrack">({localStorage.getItem("cnum")})</span></Link>}
            {!localStorage.getItem("aid") && (localStorage.getItem("cnum") == 0 || !localStorage.getItem("uid")) &&

              <Link to="/cart" >Cart<span>{<BiCart />}</span></Link>}



            {localStorage.getItem('uid') != undefined ? <span className="wel">Hi {localStorage.getItem('uname')}</span> :
              (localStorage.getItem('aid') != undefined ? <span className="wel">Admin Portal</span> :


                <select className="signin" style={{ backgroundColor: "grey", color: "white", padding: 0, fontSize: "1.3rem", fontWeight: "bold" }} onChange={this.signin}>
                  <option >Sign-in</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>

                </select>)}
          </div>
        </header>

        <aside className="sidebar">
          <h2 style={{ marginLeft: "20px", color: "purple", maxWidth: "90%", overflow: "hidden", textOverflow: "ellipsis" }}> {(localStorage.getItem('uid') != undefined || localStorage.getItem('aid') != undefined) ? <span style={{
            color: "purple", fontWeight: "lighter",
            fontSize: "medium"
          }} > {localStorage.getItem('uid') != undefined ? <span><span style={{ fontSize: "large" }}>Hi  </span >{localStorage.getItem('uname')}</span> : <span>Admin Portal</span>}</span> :
            <Link style={{ textDecoration: "none", color: "purple", fontWeight: "lighter", fontSize: "large" }}
              to="register">Sign-in</Link>
          } <button className="btncside" style={{ float: "right", fontWeight: "bold" }} onClick={this.closemenu}>x</button></h2>

          <ul style={{ listStyle: "none" }}>

            <li>
              <Link to="/">Home</Link>
              {/* <Link to={{pathname:"/" ,spos:this.state.spos}}>Home</Link> */}

            </li>

            <li>Shopping Categories</li>

            <li>
              <button onClick={() => this.sc("men")}>Men</button>

              {this.state.sc == "men" &&
                <ul className="sco" >
                  {this.state.sca.map(p =>
                    <li>
                      <button

                        onClick={() => {                        this.props.history.push({pathname:"/",sc:this.state.sc,p:p})

                        }
                        }
                      >
                        {p}
                      </button>
                    </li>
                  )}
                </ul>
              }

            </li>
            <li>
              <button onClick={() => this.sc("women")}>Women</button>

              {this.state.sc == "women" &&
                <ul className="sco" >
                  {this.state.sca.map(p =>
                    <li>
                      <button onClick={() => {
                                                this.props.history.push({pathname:"/",sc:this.state.sc,p:p})
                                              }
                      }
                      >
                        {p}
                      </button>
                    </li>
                  )}
                </ul>
              }

            </li>
            <li>
              <button onClick={() => this.sc("kids")}>Kids</button>

              {this.state.sc == "kids" &&
                <ul className="sco" >
                  {this.state.sca.map(p =>
                    <li>
                      <button onClick={() => {
                        this.props.history.push({pathname:"/",sc:this.state.sc,p:p})

                      }
                      }
                      >
                        {p}
                      </button>
                    </li>
                  )}
                </ul>
              }

            </li>


            {localStorage.getItem("aid") &&

              <li>
                <Link to="/addpro">Manage Products</Link>

              </li>
            }

            {!localStorage.getItem("aid") &&
              <div>
                <hr />
                <li>
                  Account
                </li>
                <li>
                  <Link to="/editprofile">Edit Profile</Link>
                </li>

                <li>
                  <Link to="/editaddress">Manage Addresses</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/orders">Your Orders</Link>
                </li>

                <li>
                  <Link to="/contact">Contact-us</Link>
                </li>
              </div>
            }

            {localStorage.getItem('uid') != undefined || localStorage.getItem('aid') != undefined ?


              <li>
                <button onClick={this.logout}>Logout</button>
              </li>

              : ""}

          </ul>
        </aside>




        <main className="main">
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} spos={this.state.spos} ref={this.state.iRef} />} />
            {/* <Route exact path="/" render={(props)=><Home {...props} spos={this.state.spos}/>} /> */}

            <Route path="/productbycategory/:cat" exact component={Home} />

            <Route path="/products/:id" exact component={Products} />
            <Route path="/addpro" exact component={Addpro} />
            <Route path="/register" exact component={Register} />
            <Route path="/checkout" exact component={Checkout} />

            {/* <Route path="/login/:v" exact component={S}/> */}
            <Route path="/login/:v" exact component={Login} />


            <Route path="/editpro/:v" exact component={Editpro} />
            <Route path="/editprofile" exact component={EditProfile} />

            <Route path="/cart" exact component={Cart} />
            <Route path="/wishlist" exact component={Wishlist} />
            <Route path="/editaddress" exact component={EditAddresses} />
            <Route path="/addaddress" exact component={Addaddress} />
            <Route path="/addressselection" exact component={Addressselection} />

            <Route path="/filter" exact component={Filter} />

            <Route path="/contact" exact component={Contact} />
            <Route path="/orders" exact component={Orders} />

            <Route path="/resetpassword/:id/:token" exact component={Resetpassword} />
            <Route component={Pagenf} />








          </Switch>
        </main>
        <footer className="footer">
          All Rights Reserved
  </footer>

      </div>

    );
  }
}
export default withRouter(App);


