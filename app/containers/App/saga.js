import { takeEvery, select, put, call } from 'redux-saga/effects';
// import { takeEvery, takeLatest, select, put, call } from 'redux-saga/effects';
import { csvParse } from 'd3-dsv';
// import extend from 'lodash/extend';
import 'whatwg-fetch';

// import dataRequest from 'utils/data-request';
import {
  // getLocale,
  // getRouterLocation,
  getDataReadyByKey,
  getDataRequestedByKey,
} from './selectors';

import { dataRequested, dataLoaded, dataLoadingError } from './actions';
import {
  LOAD_DATA_IF_NEEDED,
  DATA_URL,
  DATA_RESOURCES,
  // PATHS,
} from './constants';

const MAX_LOAD_ATTEMPTS = 5;

/**
 * Generator function. Function for restarting sagas multiple times before giving up and calling the error handler.
 * - following https://codeburst.io/try-again-more-redux-saga-patterns-bfbc3ffcdc
 *
 * @param {function} generator the saga generator to be restarted
 * @param {function} handleError the error handler after X unsuccessful tries
 * @param {integer} maxTries the maximum number of tries
 */
const autoRestart = (generator, handleError, maxTries = MAX_LOAD_ATTEMPTS) =>
  function* autoRestarting(...args) {
    let n = 0;
    while (n < maxTries) {
      n += 1;
      try {
        yield call(generator, ...args);
        break;
      } catch (err) {
        if (n >= maxTries) {
          yield handleError(err, ...args);
        }
      }
    }
  };

export function* loadDataSaga({ key }) {
  const resourceIndex = DATA_RESOURCES.map(r => r.key).indexOf(key);
  if (resourceIndex > -1) {
    // requestedSelector returns the times that entities where fetched from the API
    const requestedAt = yield select(getDataRequestedByKey, key);
    const ready = yield select(getDataReadyByKey, key);
    // If haven't loaded yet, do so now.
    if (!requestedAt && !ready) {
      const url = `${DATA_URL}/${DATA_RESOURCES[resourceIndex].file}`;
      try {
        // First record that we are requesting
        yield put(dataRequested(key, Date.now()));
        const response = yield fetch(url);
        const responseOk = yield response.ok;
        if (responseOk && typeof response.text === 'function') {
          const responseBody = yield response.text();
          if (responseBody) {
            yield put(dataLoaded(key, csvParse(responseBody), Date.now()));
          } else {
            yield put(dataRequested(key, false));
            throw new Error(response.statusText);
          }
        } else {
          yield put(dataRequested(key, false));
          throw new Error(response.statusText);
        }
      } catch (err) {
        yield put(dataRequested(key, false));
        // throw error
        throw new Error(err);
      }
    }
  }
}

/**
 * Generator function. Load data error handler:
 * - Record load error
 *
 * @param {object} payload {key: data set key}
 */
function* loadDataErrorHandler(err, { key }) {
  yield put(dataLoadingError(err, key));
}

export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(
    LOAD_DATA_IF_NEEDED,
    autoRestart(loadDataSaga, loadDataErrorHandler, MAX_LOAD_ATTEMPTS),
  );
}
