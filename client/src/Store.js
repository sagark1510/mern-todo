import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleWare = createSagaMiddleware();

const middleware = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return composeEnhancers(applyMiddleware(sagaMiddleWare));
};
const store = createStore(reducers, {}, middleware());
sagaMiddleWare.run(rootSaga);

export default store;
