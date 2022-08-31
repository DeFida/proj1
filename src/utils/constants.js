/* eslint-disable import/prefer-default-export */
import Api from './api';

export const api = new Api({
  headers: {
    'Content-Type': 'application/json',
  },
  
});