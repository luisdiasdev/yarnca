import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './ducks';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancers = compose(applyMiddleware(...middlewares));

const store = createStore(reducers, enhancers);

sagaMiddleware.run(sagas);

export default store;
