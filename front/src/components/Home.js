import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { productsdis, murl } from './ser';
import { BiSort } from 'react-icons/bi'
import { BsFilter } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'

export class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [], sortopt: "", vis: false, search: "", spos: this.props.spos, sarr: [], filter: this.props.location.filter
    }
  }

  handlee = (e) => {
    this.setState({ sortopt: e.target.value })
    this.setState({ vis: false })
    if (e.target.value == "htl") {


      this.state.sarr.sort(function (a, b) {
        var keyA = a.price
        var keyB = b.price
        if (keyA > keyB) {
          return -1
        }
        if (keyA < keyB) {
          return 1
        }
        return 0

      })

    }

    if (e.target.value == "newest") {

      this.setState({ sarr: [...this.state.products] }, () => {
        if (this.props.location.filter != undefined) {

          this.applyfilter()


        }

      }
      )

    }


    if (e.target.value == "lth") {

      this.state.sarr.sort(function (a, b) {

        var keyA = a.price
        var keyB = b.price
        if (keyA > keyB) {
          return 1

        }
        if (keyA < keyB) {
          return -1
        }
        return 0

      })

    }

  }


  scf = (c, w) => {
    let farr = this.state.products.filter(p => {

      if (p.wear == w) {
        return p;
      }

    })


    this.setState({
      sarr: farr.filter(p => {

        if (p.category == c) {
          return p;
        }

      })
    })
  }







  applyfilter = async () => {
    let farr = [...this.state.sarr]
    let obj = { ...this.state.filter };


    if (obj.brand.length != 0) {
      farr = farr.filter(p => {
        for (var i = 0; i < obj.brand.length; i++) {

          if (p.brand.toLowerCase() == (obj.brand[i].toLowerCase())) {
            return p;
          }

        }
      })
    }

    if (obj.category.length != 0) {

      farr = farr.filter(p => {
        for (var i = 0; i < obj.category.length; i++) {

          if (p.wear.toLowerCase() == (obj.category[i].toLowerCase())) {
            return p;
          }

        }
      })
    }

    if (obj.ideal.length != 0) {

      farr = farr.filter(p => {
        for (var i = 0; i < obj.ideal.length; i++) {

          if (p.category.toLowerCase() == (obj.ideal[i].toLowerCase())) {
            return p;
          }

        }
      })
    }

    if (obj.dmin || obj.dmax) {
      if (obj.dmax == "") {
        farr = farr.filter(p => {
          if (obj.dmin <= p.discount) {

            return p
          }


        }
        )


      }

      else {
        farr = farr.filter(p => {
          if (p.discount < obj.dmax) {

            return p
          }


        }
        )
      }

    }


    if (obj.pmin || obj.pmax) {
      if (obj.pmax == "") {
        farr = farr.filter(p => {
          if (obj.pmin <= p.price) {

            return p
          }


        }
        )


      }

      else {
        if (obj.pmin == "") {

          farr = farr.filter(p => {
            if (p.price <= obj.pmax) {
              return p
            }


          }
          )
        }

        else {
          farr = farr.filter(p => {
            if (obj.pmin <= p.price <= obj.pmax) {

              return p
            }


          }
          )
        }

      }

    }

    this.setState({ sarr: farr })


  }

  componentDidUpdate(prevprops) {


    if (prevprops.spos != this.props.spos) {
      this.setState({ spos: this.props.spos })


    }

    else if (prevprops.location.sc != this.props.location.sc || prevprops.location.p != this.props.location.p) {
      this.scf(this.props.location.sc, this.props.location.p)
    }


  }

  async componentDidMount() {

    await productsdis()
    
      .then(res => {

        this.setState({ products: [...res.data.ob] })
        this.setState({ sarr: [...res.data.ob] })


      })


    if (this.props.location.filter != undefined) {

      this.setState({ filter: this.props.location.filter }, () => { this.applyfilter() })


    }
    else if (this.props.location.sc) {
      this.scf(this.props.location.sc, this.props.location.p)
    }
  }


  sort = () => {
    this.setState(p => ({ vis: !p.vis }))

  }

  filter = () => {
    if (this.props.location.filter) {
      this.props.history.push({ pathname: "/filter", filter: this.props.location.filter })

    }
    else {
      this.props.history.push("/filter")
    }
  }
  search = (e) => {
    let value = document.querySelector("[name=search]").value

    this.setState({
      sarr: this.state.arr.filter(p => {
        if (p.product.toLowerCase().includes(value.toLowerCase())) {
          return p
        }
      }
      )
    })


  }

  shandle = (e) => {


    if (e.which == 13 || e.keyCode == 13) {

      this.search()
    }
  }


  render() {

    return (



      <div>
        <br />
        {!this.state.spos &&
          <div className="search">
            <input type="text" placeholder="Search" name="search" onKeyPress={this.shandle} /><button onClick={this.search}>{<AiOutlineSearch />}</button>

          </div>}

        <div className="sortfilter">

          <button onClick={this.sort}><span style={{ borderRight: "0.01rem solid rgb(207, 193, 193)", paddingRight: "0.9rem" }}>{<BiSort />}Sort</span></button>
          <button onClick={this.filter}><span >{<BsFilter />}Filter</span></button>
          <br />
          <br />
          {this.state.vis && <div className="m sortoptions">

            <ul>
              <li>SORT By<hr /></li>


              <li>
                <label>Newest</label>
                <input type='radio' name='sort' value='newest' checked={this.state.sortopt == "newest"} onChange={this.handlee} />
              </li>
              <li>
                <label>Price -- Low to High</label>
                <input type='radio' name='sort' value='lth' checked={this.state.sortopt == "lth"} onChange={this.handlee} />
              </li>
              <li>
                <label>Price -- High to Low</label>
                <input type='radio' name='sort' value='htl' checked={this.state.sortopt == "htl"} onChange={this.handlee} />
              </li>

            </ul>

          </div>}

        </div>


        <ul className="products">


          {this.state.sarr.map(product =>

            <li >

              <Link to={`/products/${product._id}`}>
                <div className="product-image"><img src={`${murl}/${product.image}`} /></div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-name">{product.product}</div>

                <div className="product-price">Rs{product.price}</div>
                {product.oprice != product.price ? <div className="product-price"><del>Rs{product.oprice}</del> ({product.discount}% OFF)</div> : <div ></div>}



              </Link>
            </li>
          )}





        </ul>


      </div>
    )
  }
}

export default React.forwardRef((props, ref) => <Home ref={ref} {...props} />);
