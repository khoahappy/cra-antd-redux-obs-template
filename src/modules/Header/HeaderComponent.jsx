import React, { PureComponent } from 'react';

class HeaderComponent extends PureComponent {
  componentDidMount = () => {
    console.log('Header mount');
  };

  render() {
    return (
      <div>
        Header Work!
      </div>
    );
  }
}

export default HeaderComponent;
