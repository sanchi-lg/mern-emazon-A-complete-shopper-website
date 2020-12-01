import React, { Component } from 'react'
import { addaddress } from './ser'
export class Addaddress extends Component {
constructor(props) {
    super(props)

    this.state = {
        email:localStorage.getItem('uid'), name:"",mobile:"",pincode:"",flatno:"",area:"",landmark:"",city:"",state:"",type:"home"
    }
}


 componentDidMount(){
   
      if(localStorage.getItem('uid')==undefined){
          alert("login first")
          this.props.history.push("/register")
      }
    }

handle=(e)=>{
    const{name,value}=e.target
   
    this.setState({[name]:value})
}

submit=(e)=>{
    e.preventDefault()
    let str
    str=" "+this.state.name+"\n"+this.state.flatno+","+this.state.area+" "+this.state.landmark+"\n"+this.state.city+","+this.state.state+", "+this.state.pincode+
    "\nPhone Number:"+ this.state.mobile+"\n"+this.state.type
    addaddress({email:this.state.email,address:str})
    .then(res => {
        if (res.data.err == 1) {
            alert(res.data.mssg);
        }

        else {
            this.props.history.push("/editaddress")
            window.location.reload()
        }
    })
}

    render() {
        return (
            <div className="addaddress" >

                    <form onSubmit={this.submit}>
                     <h2>Add a new address</h2>
                     <br/>
                     <input type="text" value="India"/>
                     <input type="text" placeholder="Full name" name="name" required onChange={this.handle}/>
                     <input type="tel" placeholder="Mobile number" name="mobile" pattern="[0-9]{10}"  required onChange={this.handle}/>

                     <input type="number" placeholder="PIN code" name="pincode" required onChange={this.handle}/>
                     <input type="text" placeholder="Flat,House no.,Building,Company,Apartment" name="flatno" required onChange={this.handle}/>
                     <input type="text" placeholder="Area,Colony,Street,Sector,Village" name="area" required onChange={this.handle}/>
                     <input type="text" placeholder="Landmark e.g. near Apollo Hospital" name="landmark" required onChange={this.handle}/>
                     <input type="text" placeholder="Town/City" name="city" required onChange={this.handle}/>
                     <input type="text" placeholder="State" name="state" required onChange={this.handle}/>
                     <br/>
                     <h2>Add Delivery Instructions</h2>
                     <p>Preferences are used to plan your delivery,However,shipments can sometimes arrive early or later than planned</p>
                     <h4>Address Type</h4>
                     <select name="type" style={{height:"3rem",width:"100%"}} onChange={this.handle}>
                         <option value ="home">Home(7 am-9 pm delivery)</option>
                         <option value ="office">Office/Commercial(10 am-6 pm delivery)</option>

                     </select>
                     <br/>
                     <br/>
                     <button type="submit" style={{backgroundColor:"orange",padding:"0.2rem",width:"100%",height:"3rem"}}>Add address</button>
                     </form>





            </div>
        )
    }
}

export default Addaddress
