import React from 'react';
import './NavBar.css'
import "./HomePage.css";

class GetNetwork extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value:'',
            networks: {}
        };
    }
    componentDidMount() {

    }
          onInput = event => {
            if (event.target.value) {
                console.log(`Oyeeeee  ->   ${event.target.value}`);
                
                fetch(`http://localhost:8098/network/getNetworkDetails?network_details=${event.target.value}`)
                  .then((response) => {
                    console.log("Responsess  -> ", response);              
                    // Read the body once and return the promise
                    return response.json();
                  })
                  .then(data => {
                    console.log("Data -> ", data);
                    console.log("Ohoooo - ", )
                    this.setState({ networks: data });
                    // Process or use the data as needed
                    // this.props.searchmovieresult(data);
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });
              }
            else{
                // this.props.searchmovieresult([])
            }
           
        }

        deleteClick = (index) => {
            console.log("Hello inside Submit Click", index);
            
            fetch(`http://localhost:8098/dns/deleteDns`,{
                method : 'DELETE',
                body : JSON.stringify({ip_address : this.state.ips[index].ip_address}),
                headers : {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then((response) => {
                if(response.ok){
                    alert("Deleted")
                    window.location.reload();
                    return;
                }
                else{
                  alert("Cannot Delete")

                }
              return response.json()
            })
              
            .then((json) => {
                if(json.error)
                this.setState({errormessage : json.error})
                else
                window.location.reload();
                console.log(json)
        
          })}

          createClick = () => {
            return(
              window.location = '/networkCreate'
            )
          
          }

          createClickDNS = () => {
            return(
              window.location = '/ipaddress'
            )
          
          }
          logoclick = () => {
            return(
              window.location = '/ipaddress'
            )
          
          }

    render(){
        console.log('Heyyyyaaa', this.state.ips)
    return (
        
        <>
<div class = "navbar">
            <div class="companyLogo" onClick={this.logoclick}><img src = "/images/network.jpeg" width = "40" height = "40" alt =""/></div>
            {(this.props.displaySearch) ?
            <div>
              </div>
            : 
            <div></div>}
            </div>
        
    <div class="SearchBar">

      <div className="SearchIconWrapper"><img className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
      {/* <input className="SearchInput" type="text" placeholder="Search for products, brands and more..." onChange={this.getText} ></input>  */}
      <input
                        className="search"
                        type="text"
                        placeholder="Search for Network Name..."
                        name="search"
                        onInput={this.onInput} 
                        value={this.state.search}
                    />

        <input className="submitBtn2" type ="submit" onClick={this.createClick}
            value = "Create N/W"
        />

        <input className="submitBtn" type ="submit" onClick={this.createClickDNS}
            value = "DNS Info"
        />

      </div>
      
      <div class="grid-container1">

            { 
            // this.state.ips && this.state.networks((item, index) => (
            <div class="grid-item1">
            <div className="homeEntity">Network Address - {this.state.networks.network_address}</div>
            <div className="homeEntity">Network Name - {this.state.networks.network_name}</div>
            <div className="homeEntity">Default Gateway - {this.state.networks.default_gateway}</div>
            <div className="homeEntity">Vlan id - {this.state.networks.vlan_id}</div>
            <div className="homeEntity">City - {this.state.networks.city}</div>
            {this.state.networks.dns_servers && this.state.networks.dns_servers.map((item) => (
              <div className="homeEntity">DNS Server - {item}</div>
            ))
            }
            {/* <div className="homeEntity">Email Id - {item.email_id}</div> */}
            {/* <input
            className="submitBtn"
             type="submit"
             onClick={() => this.deleteClick(index)}
            value="Delete Info"
    /> */}
            <br></br>
          </div>
      }
        </div>       
      </>);
  }

// getText(props){
//     console.log("Idhar beta")
//     console.log(props.nativeEvent.data);
//     console.log(props)
//   }
}
 export default GetNetwork;