import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ContentComponent extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div className="container">
        { children }
      </div>
    );
  }
}

ContentComponent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ContentComponent;
