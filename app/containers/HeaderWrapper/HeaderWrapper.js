import { connect } from 'react-redux';
import Header from '../../components/organisms/Header/index';

const mapStateToProps = state => ({
  breakpoint: state.get('breakpoint'),
});

export default connect(mapStateToProps)(Header);
