import React from 'react';

class LoginPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: '',
  //     password: ''
  //   };
  // }

  componentDidMount() {
    // fetch('/api/users/me').then(user => {
    //   if (user.status === 200) {
    //     window.location = '/profile';
    //   }
    // });
  }

  // onInput = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  // onLoginClick = e => {
  //   e.preventDefault();
  //   const { email, password } = this.state;
  //   fetch('/api/sessions', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   }).then(res => {
  //     if (res.status === 204) {
  //       window.location = '/profile';
  //     }
  //   });
  // }

  // onSignupClick = e => {
  //   e.preventDefault();
  //   const { email, password } = this.state;
  //   fetch('/api/users', {
  //     method: 'POST',
  //     body: JSON.stringify({ email, password }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8'
  //     }
  //   });
  // }

  render() {
    return (
      
      <h1>
        Hello
      </h1>
    );
  }
}

export default LoginPage;
