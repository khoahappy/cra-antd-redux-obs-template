import React, { PureComponent } from 'react';

class LoginComponent extends PureComponent {
  componentDidMount = () => {
    console.log('Login mounted');
  };

  render() {
    return (
      <div>
        Login work!
      </div>
    );
  }
}

export default LoginComponent;
