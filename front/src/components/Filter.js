import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Filter extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: "brand", brand: [], color: [], dmin: "", dmax: "", pmin: "", pmax: "", ideal: [], category: [], ischecked: "false"
        }
    }

    fun = (v) => {
        this.setState({ type: v })
    }

    componentDidMount() {
        if (this.props.location.filter) {
            this.setState({
                brand: this.props.location.filter.brand, dmin: this.props.location.filter.dmin, dmax: this.props.location.filter.dmax, pmin: this.props.location.filter.pmin, pmax: this.props.location.filter.pmax, category: this.props.location.filter.category
                , ideal: this.props.location.filter.ideal
            })
        }
    }

    fstore = async (e) => {
        const { name, value } = e.target
        let el = document.querySelector('[value="' + value + '"]')

        if (el.getAttribute("checked") === "") {
            var a = this.state[name]
            var i = a.indexOf(value)
            a.splice(i, 1)
            this.setState(p => ({
                [name]: a
            }))



        }
        else {
            this.setState(p => ({
                [name]: [...p[name], value]
            }))




        }

    }


    clear = () => {
        this.setState({ type: "brand", brand: [], color: [], dmin: "", dmax: "", pmin: "", pmax: "", ideal: [], category: [], ischecked: false }, () => {
            this.props.history.push({ pathname: "/", filter: this.state })
        })
    }
    fstore2 = (e) => {

        const { name, min, max } = e.target



        if (name == "discount") {

            this.setState({ dmin: min, dmax: max })

        }
        else {

            this.setState({ pmin: min, pmax: max })

        }

    }


    render() {
        const checkfn = (n, v) => {
            let arr = n == undefined ? [] : this.state[n]

            for (var i = 0; i < arr.length; i++) {
                if (v == arr[i]) {
                    return true
                }
                if (i == arr.length) {
                    return false
                }
            }
        }
        const checkfn2 = (n, min, max) => {
            if (n == "price") {
                if (min == this.state.pmin && max == this.state.pmax) {
                    return true
                }
                return false
            }
            if (n == "discount") {
                if (min == this.state.dmin && max == this.state.dmax) {
                    return true
                }
                return false
            }
        }
        const brandinput = v => (<input type="checkbox" className="filinput" name="brand" value={v} checked={checkfn("brand", v)} onChange={this.fstore} />)
        const colorinput = v => (<input type="checkbox" className="filinput" name="color" value={v} checked={checkfn("color", v)} onChange={this.fstore} />)
        const categoryinput = v => (<input type="checkbox" className="filinput" name="category" value={v} checked={checkfn("category", v)} onChange={this.fstore} />)
        const idealinput = v => (<input type="checkbox" className="filinput" name="ideal" value={v} checked={checkfn("ideal", v)} onChange={this.fstore} />)
        const priceinput = (min, max) => (<input type="radio" className="filinput" name="price" min={min} max={max} checked={checkfn2("price", min, max)} onChange={this.fstore2} />)
        const discountinput = (min, max) => (<input type="radio" className="filinput" name="discount" min={min} max={max} checked={checkfn2("discount", min, max)} onChange={this.fstore2} />)




        return (
            <div className="fouter" >
                <h2 >Filter By</h2>
                <div className="finner">

                    <div className="finner1">
                        <ul >
                            <li>
                                <button onClick={() => this.fun("brand")}>Brand</button>
                            </li>
                            <li>
                                <button onClick={() => this.fun("price")}>Price Range</button>
                            </li>
                            <li>
                                <button onClick={() => this.fun("ideal")}>Ideal For</button>
                            </li>
                            <li>
                                <button onClick={() => this.fun("category")}>Category</button>
                            </li>


                            <li>
                                <button onClick={() => this.fun("color")}>Color</button>
                            </li>
                            <li>
                                <button onClick={() => this.fun("discount")}>Discount</button>
                            </li>
                        </ul>
                    </div>

                    {this.state.type == "brand" && <div className="finner2">
                        {brandinput("levis")}<label>Levi's</label>
                        <br />
                        {brandinput("van heusen")}<label>Van Heusen</label>
                        <br />

                        {brandinput("pantaloons")}<label>Pantaloons</label>
                        <br />

                        {brandinput("biba")}<label>Biba</label>
                        <br />
                        {brandinput("mufti")}<label>Mufti</label>
                        <br />

                        {brandinput("arrow")}<label>Arrow</label>
                        <br />

                        {brandinput("pepe jeans")}<label>Pepe Jeans</label>
                        <br />


                        {brandinput("u.s. polo")}<label>U.S. POLO</label>
                        <br />

                        {brandinput("john players")}<label>John Players</label>
                        <br />


                        {brandinput("trendz")}<label>Trendz</label>
                        <br />

                        {brandinput("bata")}<label>Bata</label>





                    </div>}




                    {this.state.type == "color" && <div className="finner2">
                        {colorinput("white")}<label>White</label>
                        <br />
                        {colorinput("black")}<label>Black</label>
                        <br />
                        {colorinput("red")}<label>Red</label>
                        <br />
                        {colorinput("violet")}<label>Violet</label>
                        <br />
                        {colorinput("pink")}<label>Pink</label>
                        <br />
                        {colorinput("green")}<label>Green</label>
                        <br />
                        {colorinput("orange")}<label>Orange</label>
                        <br />
                        {colorinput("yellow")}<label>Yellow</label>
                        <br />
                        {colorinput("brown")}<label>Brown</label>
                        <br />
                        {colorinput("blue")}<label>Blue</label>
                        <br />

                    </div>

                    }

                    {this.state.type == "category" && <div className="finner2">
                        {categoryinput("shirt")}<label>Shirt</label>
                        <br />
                        {categoryinput("t-shirt")}<label>T-Shirt</label>
                        <br />
                        {categoryinput("kurta")}<label>Kurta</label>
                        <br />
                        {categoryinput("top")}<label>Top</label>
                        <br />
                        {categoryinput("saree")}<label>Saree</label>
                        <br />
                        {categoryinput("jeans")}<label>Jeans</label>
                        <br />
                        {categoryinput("trouser")}<label>Trouser</label>
                        <br />
                        {categoryinput("legging")}<label>Legging</label>
                        <br />
                        {categoryinput("socks")}<label>Socks</label>
                        <br />
                        {categoryinput("shoes")}<label>Shirt</label>
                        <br />

                    </div>

                    }

                    {this.state.type == "ideal" && <div className="finner2">
                        {idealinput("men")}<label>Men</label>
                        <br />
                        {idealinput("women")}<label>Women</label>
                        <br />
                        {idealinput("kids")}<label>Kids</label>
                        <br />

                    </div>

                    }

                    {this.state.type == "discount" && <div className="finner2">


                        {discountinput("90", "")}<label>90% or more</label>
                        <br />

                        {discountinput("80", "")}<label>80% or more</label>
                        <br />

                        {discountinput(70, "")}<label>70% or more</label>
                        <br />

                        {discountinput("60", "")}<label>60% or more</label>
                        <br />

                        {discountinput("50", "")}<label>50% or more</label>
                        <br />

                        {discountinput("40", "")}<label>40% or more</label>
                        <br />

                        {discountinput("30", "")}<label>30% or more</label>
                        <br />

                        {discountinput("20", "")}<label>20% or more</label>
                        <br />

                        {discountinput("10", "")}<label>10% or more</label>
                        <br />

                        {discountinput("", "10")}<label>10% below</label>










                        <br />
                    </div>}


                    {this.state.type == "price" && <div className="finner2">
                        {priceinput("", 249)}<label>Rs 249 and Below</label>
                        <br />
                        {priceinput(250, 499)}<label>Rs 250-Rs 499</label>
                        <br />
                        {priceinput(500, 999)}<label>Rs 500-Rs 999</label>
                        <br />
                        {priceinput(1000, 1499)}<label>Rs 1000-Rs 1499</label>
                        <br />
                        {priceinput(1500, 1999)}<label>Rs 1500-Rs 1999</label>
                        <br />
                        {priceinput(2000, 2499)}<label>Rs 2000-Rs 2499</label>
                        <br />
                        {priceinput(2500, "")}<label>Rs 2500 and Above</label>
                        <br />
                    </div>}
                </div>

                <div className="filbttn">
                    <button onClick={this.clear}>Clear</button>
                    <button onClick={this.apply}><Link to={{ pathname: "/", filter: this.state }} style={{ textDecoration: "none", color: "white" }}>Apply</Link></button>

                </div>


            </div>
        )
    }
}

export default Filter
