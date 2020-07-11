import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"

import notesReducer from "./store/reducers/notes"
import foldersReducer from "./store/reducers/folders"
import {BrowserRouter} from "react-router-dom"
import authReducer from "./store/reducers/auth"

//====================================
import 'react-quill/dist/quill.snow.css';
//====================================

const reducers = combineReducers({
    notes: notesReducer,
    folders: foldersReducer,
    auth: authReducer
  }
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


