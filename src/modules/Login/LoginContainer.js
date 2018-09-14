import { connect } from 'react-redux';

import LoginComponent from './LoginComponent';
import * as action from './LoginAction';
import * as selector from './LoginSelector';

const mapStateToProps = state => ({
  isFetching: selector.isFetching(state),
  isAuthenticated: selector.isAuthenticated(state),
});

// TODO: implement this,
const mapDispatchToProps = dispatch => ({
  login: () => dispatch(action.login()),
  register: mode => dispatch(action.register(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
