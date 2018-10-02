import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../../components/organisms/Header/index';

const mapStateToProps = state => ({
  breakpoint: state.get('breakpoint'),
});

export default withRouter(connect(mapStateToProps)(Header));
