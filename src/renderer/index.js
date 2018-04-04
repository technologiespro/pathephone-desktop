import './css/izi.css'
import './css/global.css'
import './css/palette.css'
import './css/animate.css'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'
import AppContainer from './view/AppContainer'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('mount-point')
)