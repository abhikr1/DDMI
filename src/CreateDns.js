import React from 'react';
import './NavBar.css';
import './LoginPage.css'


class CreateDns extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value:'',
            ip_address:'',
            domain_name:'',
            record_type:'',
            max_address:'',
            comment:'',
            email_id:''
        };
    }
        componentDidMount() {
            
        }
        onInput = event => {
            this.setState({ [event.target.name]: event.target.value });
        }

        createClick = () => {
            return(
              window.location = '/dnsCreate'
            )
          }
          homeClick = () => {
            return(
              window.location = '/ipaddress'
            )
          }
          logInClick = (e) => {
            e.preventDefault();
            console.log("Hello inside Submit Click");
            fetch(`http://localhost:8098/dns/createDns`,{
                method : 'POST',
                body : JSON.stringify({ip_address : this.state.ip_address, domain_name : this.state.domain_name,
                    record_type : this.state.record_type , max_address : this.state.max_address,
                    comment : this.state.comment, email_id : this.state.email_id
                }),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
            if(response.ok){
                alert("Created");
                window.location = '/ipaddress'
            }
              else{
                alert("IP Already Exists");
                window.location = '/ipaddress'
              }
            
            response.json()})
              
            .then((json) => {
                window.location.reload();
                console.log(json)})
        }

    render(){
        console.log('Heyyyyaaa', this.state.ips)
    return (               
         <div class="formContainer1">
    <form>
    <div className = "entries1">
        <input type ="button" className="submitBtn" onClick={this.homeClick}
            value = "Home"
        />
        </div>
        
        <div class = "loginheading1">Create DNS</div>
        

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter IP Address or Domain Name .."
            name="ip_address"
            onInput={this.onInput} 
            value={this.state.ip_address}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter Domain Name.."
            name="domain_name"
            onInput={this.onInput} 
            value={this.state.domain_name}
        />
        </div>

        <div className="entries1">
        <select
          className="email1"
          required
          name="record_type"
          onChange={this.onInput}
          value={this.state.record_type}
        >
          {/* <option value="" disabled>Select Record Type</option> */}
          <option value="A">A</option>
          <option value="PTR">PTR</option>
          <option value="A+PTR">A+PTR</option>
          {/* Add more options as needed */}
        </select>
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter MaxAddress.."
            name="max_address"
            onInput={this.onInput} 
            value={this.state.max_address}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter Comment.."
            name="comment"
            onInput={this.onInput} 
            value={this.state.comment}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="email"
            required="required"
            placeholder="Enter E-mail"
            name="email_id"
            onInput={this.onInput} 
            value={this.state.email_id}
        />
        </div>
        </form>
        <div className = "entries1">
        <input type ="submit" className="submitBtn" onClick={this.logInClick}
            value = "Add DNS"
        />
        </div>
        
        {this.state.errormessage ? <div className = "errorMessage">{this.state.errormessage}</div> : null}
    </div>
   );
  }

// getText(props){
//     console.log("Idhar beta")
//     console.log(props.nativeEvent.data);
//     console.log(props)
//   }
}
 export default CreateDns;