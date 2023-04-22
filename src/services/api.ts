import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.91:3333/', // process.env.BASE_URL
});

export { api };