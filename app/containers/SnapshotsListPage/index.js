/**
 *
 * SnapshotsListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { Link } from 'react-router-dom';
import config from 'config';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ListView from 'components/organisms/ListView';
import { makeSelectSnapshots } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadSnapshots } from './actions';
import { breakpointIsMobile } from '../../utils/responsiveHelpers';

/* eslint-disable react/prefer-stateless-function */
export class SnapshotsListPage extends React.PureComponent {
  render() {
    const columnsMobile = {
      id: <FormattedMessage {...messages.columnId} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const columns = {
      id: <FormattedMessage {...messages.columnId} />,
      time: <FormattedMessage {...messages.columnTime} />,
    };

    const ceilConfiguration = {
      id: value => (
        <Link to={`/blockexplorer/snapshots/${value}`}>{value}</Link>
      ),
      time: value => <div title={value}> {moment(value).fromNow()} </div>,
    };

    const headerConfiguration = {};

    const sortingColumns = ['id', 'time'];
    const { match, location, snapshots, onPageChange, breakpoint } = this.props;

    const isMobile = breakpointIsMobile(this.props.breakpoint.size);

    return (
      <div>
        <Helmet>
          <title>{this.context.intl.formatMessage(messages.metaTitle)}</title>
          <meta
            name="description"
            content={this.context.intl.formatMessage(messages.metaDescription)}
          />
        </Helmet>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <ListView
          name="snapshots"
          urlParams={match.params}
          query={location.search}
          list={snapshots}
          columns={isMobile ? columnsMobile : columns}
          sortingColumns={sortingColumns}
          defaultSort="time"
          messages={messages}
          link="/blockexplorer/snapshots"
          onPageChange={onPageChange}
          tableMinWidth={config.tablesMinWidth.tableXs}
          ceilConfiguration={ceilConfiguration}
          headerConfiguration={headerConfiguration}
          breakpoint={breakpoint}
        />
      </div>
    );
  }
}

SnapshotsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  location: PropTypes.object,
  snapshots: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
  breakpoint: PropTypes.object,
};

SnapshotsListPage.contextTypes = {
  intl: intlShape,
};

const mapStateToProps = createStructuredSelector({
  snapshots: makeSelectSnapshots(),
  breakpoint: state => state.get('breakpoint'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPageChange: (page, sort, order) => {
      const offset = (page - 1) * config.limit;
      return dispatch(loadSnapshots(config.limit + 1, offset, sort, order));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'snapshotsListPage', reducer });
const withSaga = injectSaga({ key: 'snapshotsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SnapshotsListPage);
