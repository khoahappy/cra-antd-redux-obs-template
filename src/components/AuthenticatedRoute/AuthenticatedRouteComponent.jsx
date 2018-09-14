import * as React from 'react';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { isAuthenticated, isGuestMode } from '../../utils/auth-helper';

const AuthenticatedRoute = ({ component: Component, redirectUrl, ...rest }) => {
  const authenticated = isAuthenticated() || isGuestMode();
  return (
    <Route
      {...rest}
      render={props => (authenticated ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: redirectUrl,
            state: { from: props.location },
          }}
        />
      ))
      }
    />
  );
};

AuthenticatedRoute.propTypes = {
  redirectUrl: PropTypes.string.isRequired,
};

export default AuthenticatedRoute;
