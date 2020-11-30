import React, { Component } from 'react'
import { upname } from './ser'





export class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
    name:""
    }

  }

  componentDidMount() {
    if (!localStorage.getItem('uid')) {
      this.props.history.push("/")
    }

  }

  handle = (e) => {

    this.setState({"name": e.target.value })
  }

upname=(e)=>{
    e.preventDefault()
    if(this.state.name!=localStorage.getItem('uname')){
        upname({email:localStorage.getItem('uid'),name:this.state.name})
        .then(res=>{
            if(res.data.err==1){
                alert(res.data.mssg)

            }
            else{
                localStorage.setItem('uname',this.state.name)
                alert("Your profile is updated.It can take some time to reflect")
                this.props.history.push("/")
            }
        })
    }
}
  render() {
    return (
      <div>

        < form className="ep" onSubmit={this.upname}>
            <h2>Edit Profile</h2>
            <div>
              <label>Email: </label>
              <input value={localStorage.getItem('uid')}/>

            </div>
            <div>
              <label >Name: </label>
              <input name="name" type="text" placeholder={localStorage.getItem('uname')} onChange={this.handle} required/>

            </div>
           
           
            <button type="submit">Update</button>
            <br />

        </form>



        </div>


    )
  }
}

export default EditProfile
