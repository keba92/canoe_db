import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-3nig-03e.eu.auth0.com"
    clientId="7BEig9QZyHwr18jUdeAdRmNsXy7Sr2aU"
    redirectUri={window.location.origin}
    audience="https://dev-3nig-03e.eu.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
