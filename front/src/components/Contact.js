import React, { Component } from 'react'
import {contact} from './ser'
export class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name:"",email:"",subject:"",message:""
        }
    }

    handle=(e)=>{
        const {name,value}=e.target
        this.setState({[name]:value})
    }
    
    submit=(e)=>{
        e.preventDefault();
        contact(this.state)
        .then(res=>{
            if(res.data.err==0){
                alert("Thankyou to contact us.We will revert back to you within 24 hours")

            }
            if(res.data.err==1){
            alert(res.data.mssg)
            }
        })
    }

    render() {
        return (
            <div>

<div className="container">
<form className="contact" onSubmit={this.submit}>
    <fieldset>
        <legend>Contact us:</legend>
        <div style={{display:"flex"}}>
          
        <input type="text" name="name" placeholder="Name" required onChange={this.handle}/>
        <input type="email" name="email" placeholder="Email" required onChange={this.handle}/>
      
        </div>
        <input type="text" name="subject" className="subject" placeholder="Subject" required onChange={this.handle}/>
        <textarea placeholder="Feel free to reach us:Message here" name="message" equired onChange={this.handle}/>
         <button type="submit">Submit</button>
    </fieldset>
</form>

</div>

            </div>
        )
    }
}

export default Contact
