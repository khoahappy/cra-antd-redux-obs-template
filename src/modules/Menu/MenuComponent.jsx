import React from 'react';
import PropTypes from 'prop-types';

class MenuComponent extends React.PureComponent {
  componentDidMount = () => {
    const { getMenu } = this.props;
    getMenu();
  };

  render() {
    return (
      <div>
      Menu work!
      </div>
    );
  }
}

MenuComponent.propTypes = {
  getMenu: PropTypes.func.isRequired,
};

export default MenuComponent;
