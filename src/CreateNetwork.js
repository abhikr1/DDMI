import React from 'react';
import './NavBar.css';
import './LoginPage.css'
import Select from 'react-select';


class CreateNetwork extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value:'',
            network_address:'',
            network_name:'',
            default_gateway:'',
            vlan_id:'',
            city:'',
            dns_servers:[],
            ip_addresses:[],
            selectedIpAddresses: []

        };
    }
        componentDidMount() {
          fetch(`http://localhost:8098/dns/getDomainAll`)
          .then((response) => response.json())
          .then((response) => {
            console.log("All ip Address", response);
            const options = response.map(item => ({
              value: item.ip_address,
              label: item.ip_address
            }));
            this.setState({ ip_addresses: options});
          });
        }
        onInput = event => {
            this.setState({ [event.target.name]: event.target.value });
        }

          onInput2 = (selectedOptions) => {
            // 'selectedOptions' is an array of selected options
            console.log(selectedOptions);
          
            // Update state or perform other actions based on selectedOptions
            this.setState({ selectedIpAddresses: selectedOptions });
          };

        createClick = () => {
            return(
              window.location = '/dnsCreate'
            )
          }
          homeClick = () => {
            return(
              window.location = '/network'
            )
          }
          logInClick = (e) => {
            e.preventDefault();
            const valuesArray = this.state.selectedIpAddresses.map(item => item.value);
            console.log("Hello inside Submit Click");
            fetch(`http://localhost:8098/network/createNetwork`,{
                method : 'POST',
                body : JSON.stringify({network_address : this.state.network_address, network_name : this.state.network_name,
                  default_gateway : this.state.default_gateway , vlan_id : this.state.vlan_id,
                  city : this.state.city, dns_servers : valuesArray
                }),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                if(response.ok){
                  alert("Created");
                  window.location = '/network'
                }
                else{
                  alert("Cannot Create");
                }
                // if(response.ok){
                //     window.location.reload();
                //     return;
                // }
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
        
        <div class = "loginheading1">Create Network</div>
        

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter N/W Address"
            name="network_address"
            onInput={this.onInput} 
            value={this.state.network_address}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter Network Name.."
            name="network_name"
            onInput={this.onInput} 
            value={this.state.network_name}
        />
        </div>

        <div className="entries2">

        <Select
          isMulti
          className="select-container"
          required
          name="dns_servers"
          onChange={this.onInput2}
          value={this.state.selectedIpAddresses}
          options={this.state.ip_addresses}

        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter Default Gateway."
            name="default_gateway"
            onInput={this.onInput} 
            value={this.state.default_gateway}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter Vlan Id.."
            name="vlan_id"
            onInput={this.onInput} 
            value={this.state.vlan_id}
        />
        </div>

        <div className="entries1">
        <input
            className="email1"
            type="text"
            required="required"
            placeholder="Enter City"
            name="city"
            onInput={this.onInput} 
            value={this.state.city}
        />
        </div>
        </form>
        <div className = "entries1">
        <input type ="submit" className="submitBtn" onClick={this.logInClick}
            value = "Add N/W"
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
 export default CreateNetwork;