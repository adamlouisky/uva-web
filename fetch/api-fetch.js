import Router from 'next/router';
import { AUTH0_TOKEN_KEY } from '../auth/auth-config';

export const API_URI = 'http://localhost:5000/api/v1';

export const apiFetch = async data => {
  try {
    const { uri, method, body, auth } = data;

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    if (auth) {
      headers.Authorization = `Bearer ${localStorage.getItem(AUTH0_TOKEN_KEY)}`;
    }

    const options = { method, headers };

    if (method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body || {});
    }

    const response = await fetch(`${API_URI}${uri}`, options);

    // during a fetch with authorization
    // when a status code 401 is received
    // force a logout by deleting the token
    // and redirecting to "/"
    if (auth && response.status === 401) {
      localStorage.removeItem(AUTH0_TOKEN_KEY);
      Router.push('/');
      return;
    }

    const payload = await response.json();
    return payload;
  } catch (err) {
    throw err;
  }
};
