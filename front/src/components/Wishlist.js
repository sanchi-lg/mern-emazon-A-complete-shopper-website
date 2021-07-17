import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { FaRegHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { murl, wish, productsdisbyid, atc, deletefrom,cartlength } from './ser';
export class Wishlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: [], idquantity: [], v: "", email: localStorage.getItem('uid')
        }
    }



    render() {

        return (
            <div>
                {this.state.product.length == 0 ? <div className="empty">
                  
                            }
                        </ul>
                    </div>}
            </div>

        )
    }
}

export default Wishlist
