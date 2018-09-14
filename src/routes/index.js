
import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Menu } from 'antd';

import {
  BASE_URL,
  // APP_LOADER_URL,
  LOGIN_URL,
  // REQUEST_CREDENTIAL_URL,
  BASE_CONTENT_URL,
} from '../constants/url-consts';

// Module root components
import {
  HomeContainer,
  LoginContainer,
} from '../modules';
import {
  PageNotFound,
  AuthenticatedRoute,
  AppLayout,
} from '../components';

export default (
  <AppLayout menu={(
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['2']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
)}
  >
    <Switch>
      <Redirect exact from={BASE_URL} to={LOGIN_URL} />
      <Route exact path={LOGIN_URL} component={LoginContainer} />
      <AuthenticatedRoute
        path={BASE_CONTENT_URL}
        redirectUrl={LOGIN_URL}
        component={HomeContainer}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </AppLayout>
);
