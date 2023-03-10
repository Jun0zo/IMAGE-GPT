import React from 'react';

class Customer extends React.Component{
    render(){
        return(
            <div>
                <CustomerProfile id = {this.props.id} image = {this.props.image}  name = {this.props.name} age = {this.props.age}/>
                <CustomerInfo number = {this.props.number} gender = {this.props.gender}/>
            </div>
        );
    }
}

class CustomerProfile extends React.Component{
    render(){
      return(
        <div>
          <img src={this.props.image} alr="profile"/>
          <h2>{this.props.name}({this.props.age})</h2>
          <h2>{this.props.id}({this.props.id})</h2>
        </div>
      );
    }
  }
  
  class CustomerInfo extends React.Component{
    render(){
      return(
        <div>
          <p>{this.props.number}</p>
          <p>{this.props.gender}</p>
  
        </div>
      );
    }
  }
export default Customer;