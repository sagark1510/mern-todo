import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

const middleware = () => {
  return compose(applyMiddleware(sagaMiddleWare));
};
const store = createStore(reducers, {}, middleware());
sagaMiddleWare.run(rootSaga);

export default store;
