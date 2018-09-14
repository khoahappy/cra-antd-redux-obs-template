import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './AppLayoutComponent.css';

const { Header, Content } = Layout;

const AppLayoutComponent = ({
  children,
  menu = null,
}) => (
  <Layout className="App-layout">
    <Header>
      <div className="App-layout__logo" />
      {menu}
    </Header>
    <Content className="App-layout__content">
      { children }
    </Content>
  </Layout>
);

AppLayoutComponent.defaultProps = {
  menu: null,
};

AppLayoutComponent.propTypes = {
  menu: PropTypes.element,
  children: PropTypes.element.isRequired,
};
export default AppLayoutComponent;
