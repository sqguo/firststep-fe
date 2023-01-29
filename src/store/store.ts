import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storageSession  from "redux-persist/lib/storage/session";

import reducer from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
  key: "root",
  storage: storageSession
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, reducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return [store, persistor];
};

export default configureStore;