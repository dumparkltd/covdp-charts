/*
 * PathPopulationGroups
 *
 * This is the first thing users see of our App, at the '/' route
 */

// import React, { memo } from 'react';
import React from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { compose } from 'redux';s
// import { createStructuredSelector } from 'reselect';

import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

export function PathPopulationGroups() {
  useInjectSaga({ key: 'app', saga });

  // useEffect(() => {
  // }, []);

  return (
    <article>
      <Helmet>
        <title>PathPopulationGroups</title>
        <meta name="description" content="PathPopulationGroups" />
      </Helmet>
      <div>PathPopulationGroups</div>
    </article>
  );
}

PathPopulationGroups.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

// const mapStateToProps = createStructuredSelector({
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });

// export function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

// const withConnect = connect(
//   // mapStateToProps,
//   // mapDispatchToProps,
// );

export default PathPopulationGroups;
// export default compose(
//   withConnect,
//   memo,
// )(HomePage);
