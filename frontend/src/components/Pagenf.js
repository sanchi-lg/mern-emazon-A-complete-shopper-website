import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Pagenf extends Component {
    render() {
        return (
            <div style={{ width: "50%", margin: "auto" }}>
                <h2 style={{ color: "orange", marginTop: "3rem" }}>Looking for Something? </h2>
                <h2>We're sorry.The Web address you entered is not a functioning page in our site</h2>
                <br />
                <h1><b>Go to Amazon's <Link to="/">Home</Link> Page</b></h1>
            </div>
        )
    }
}

export default Pagenf
