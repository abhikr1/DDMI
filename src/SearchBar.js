import React from 'react';
import './NavBar.css'
import "./HomePage.css";

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            value:'',
            ips: []
        };
    }
        componentDidMount() {
            
        }
          onInput = event => {
            if (event.target.value) {
                console.log(`Oyeeeee  ->   ${event.target.value}`);
                
                fetch(`http://localhost:8098/dns/getDomain?ip=${event.target.value}`)
                  .then((response) => {
                    console.log("Responsess  -> ", response);
              
                    // Read the body once and return the promise
                    return response.json();
                  })
                  .then(data => {
                    console.log("Data -> ", data);
                    console.log("Ohoooo - ", )
                    this.setState({ ips: data });
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
                    window.location.reload();
                    return;
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
              window.location = '/dnsCreate'
            )
          
          }
          createClickNetwork = () => {
            return(
              window.location = '/network'
            )
          
          }

    render(){
        console.log('Heyyyyaaa', this.state.ips)
    return (
        
        <>
<div class = "navbar">
            <div class="companyLogo" onClick={this.logoclick}><img src = "/images/dns.jpeg" width = "40" height = "40" alt =""/></div>
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
                        placeholder="Search for Ip or Domain Name..."
                        name="search"
                        onInput={this.onInput} 
                        value={this.state.search}
                    />

        <input className="submitBtn2" type ="submit" onClick={this.createClick}
            value = "Create DNS"
        />

        <input className="submitBtn" type ="submit" onClick={this.createClickNetwork}
            value = "Network Info"
        />

      </div>
      
      <div class="grid-container1">

            { 
            this.state.ips && this.state.ips.map((item, index) => (
            <div class="grid-item1">
            <div className="homeEntity">IP Address - {item.ip_address}</div>
            <div className="homeEntity">Domain - {item.domain_name}</div>
            <div className="homeEntity">Record Type - {item.record_type}</div>
            <div className="homeEntity">Max Address - {item.max_address}</div>
            <div className="homeEntity">Comment - {item.comment}</div>
            <div className="homeEntity">Email Id - {item.email_id}</div>
            <input
            className="submitBtn"
             type="submit"
             onClick={() => this.deleteClick(index)}
            value="Delete Info"
    />
            <br></br>
          </div>
         
        ))}
        </div>
        <div>
        {!this.state.ips && <h1>No records found</h1>}
        </div>
        
      </>);
  }

// getText(props){
//     console.log("Idhar beta")
//     console.log(props.nativeEvent.data);
//     console.log(props)
//   }
}
 export default SearchBar;