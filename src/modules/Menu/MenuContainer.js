import { connect } from 'react-redux';

import MenuComponent from './MenuComponent';
import * as action from './MenuAction';
import * as selector from './MenuSelector';

const mapStateToProps = state => ({
  menu: selector.menuSelector(state),
});

// TODO: implement this,
const mapDispatchToProps = dispatch => ({
  getMenu: () => dispatch(action.getMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
