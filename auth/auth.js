import auth0 from 'auth0-js';
import Router from 'next/router';
import * as auth0Config from './auth-config';
import { apiFetch } from '../fetch/api-fetch';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: auth0Config.AUTH0_DOMAIN,
    clientID: auth0Config.AUTH0_CLIENT_ID,
    redirectUri: auth0Config.AUTH0_REDIRECT_URI,
    responseType: auth0Config.AUTH0_RESPONSE_TYPE,
    scope: auth0Config.AUTH0_SCOPE,
  });

  isAuthenticated = () => {
    const token = localStorage.getItem(auth0Config.AUTH0_TOKEN_KEY);
    return token ? true : false;
  };

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.getAndSaveToken(authResult);
      } else if (err) {
        Router.push('/');
      }
    });
  };

  getAndSaveToken = async authResult => {
    try {
      const { accessToken, expiresIn } = authResult;
      const uri = '/auth/get-jwt';
      const method = 'POST';
      const body = { accessToken, expiresIn };
      const payload = await apiFetch({ uri, method, body });

      if (payload && payload.data && payload.data.token) {
        localStorage.setItem(auth0Config.AUTH0_TOKEN_KEY, payload.data.token);
      }

      Router.push('/');
    } catch (err) {
      Router.push('/');
    }
  };

  logout = () => {
    localStorage.removeItem(auth0Config.AUTH0_TOKEN_KEY);
    Router.push('/');
  };
};
