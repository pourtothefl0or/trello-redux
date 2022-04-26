import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/normalize.css';
import './styles/common.css';
import { Index } from './pages/Index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Index />
    </PersistGate>
  </Provider>
);
